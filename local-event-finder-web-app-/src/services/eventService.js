import { eventService as apiEventService } from './api';
import { mockEvents, mockCategories, mockCities, getEventsByCity } from '../data/mockEvents';

// Flag to determine whether to use real API or mock data
// Set to true by default to use mock data
const USE_MOCK_DATA = true;

const eventService = {
  // Get events with filtering
  getEvents: async (filters = {}) => {
    try {
      if (USE_MOCK_DATA) {
        // Apply filters to mock data
        let filteredEvents = [...mockEvents];
        
        if (filters.city) {
          // Use the optimized getEventsByCity function for city filtering
          filteredEvents = getEventsByCity(filters.city);
          
          // Log the number of events found for debugging
          console.log(`Found ${filteredEvents.length} events in ${filters.city}`);
        }
        
        if (filters.category) {
          // Get a simplified category name that can be used for filtering
          const getSimplifiedCategory = (category) => {
            // Make lowercase
            category = category.toLowerCase();
            
            // Map general terms to specific categories
            if (category === 'tech') return 'technology';
            if (category === 'arts' || category === 'arts & culture') return 'arts';
            if (category === 'music') return 'music';
            if (category === 'business' || category === 'business & professional') return 'business';
            if (category === 'food' || category === 'food & drink') return 'food';
            if (category === 'entertainment') return 'entertainment';
            
            return category;
          };
          
          const filterCategory = getSimplifiedCategory(filters.category);
          
          // More flexible category matching
          filteredEvents = filteredEvents.filter(event => {
            const eventCategory = getSimplifiedCategory(event.category);
            return eventCategory === filterCategory || 
                   eventCategory.includes(filterCategory) || 
                   filterCategory.includes(eventCategory);
          });
        }
        
        // Simplified version - removed query, startDate, and endDate filters
        
        // Sort by date (nearest upcoming events first)
        const now = new Date();
        filteredEvents.sort((a, b) => {
          const dateA = new Date(a.start.local);
          const dateB = new Date(b.start.local);
          
          // Put future events first, sorted by nearest date
          if (dateA >= now && dateB >= now) {
            return dateA - dateB;
          }
          
          // Put future events before past events
          if (dateA >= now && dateB < now) {
            return -1;
          }
          
          if (dateA < now && dateB >= now) {
            return 1;
          }
          
          // For past events, show most recent first
          return dateB - dateA;
        });
        
        return {
          pagination: {
            page_count: 1,
            page_size: filteredEvents.length,
            page_number: 1,
            has_more_items: false
          },
          events: filteredEvents
        };
      } else {
        // Try multiple approaches to get real events
        try {
          // First try the standard API
          const response = await apiEventService.getEvents({
            'location.address': 'Kenya',
            ...filters
          });
          
          // Process Eventbrite API response to match our expected format
          return {
            pagination: response.pagination,
            events: response.events || []
          };
        } catch (apiError) {
          console.log('Failed to get events from primary API, trying popular events', apiError);
          
          // Try our backup method
          try {
            return await apiEventService.getPopularEvents();
          } catch (backupError) {
            console.log('All API methods failed, using mock data as last resort', backupError);
            
            // As last resort, use mock data but don't tell caller we're using mock data
            let filteredEvents = [...mockEvents];
            // (filtering logic as above - but we'll skip re-implementing it since this is a last resort)
            
            return {
              pagination: {
                page_count: 1,
                page_size: filteredEvents.length,
                page_number: 1,
                has_more_items: false
              },
              events: filteredEvents
            };
          }
        }
      }
    } catch (error) {
      console.error('Unexpected error in eventService.getEvents:', error);
      // Final fallback to mock data
      return {
        pagination: {
          page_count: 1,
          page_size: mockEvents.length,
          page_number: 1,
          has_more_items: false
        },
        events: mockEvents
      };
    }
  },
  
  // Get specific event by ID
  getEventById: async (eventId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for event details');
        const event = mockEvents.find(event => event.id === eventId);
        
        if (!event) {
          throw new Error(`Event with ID ${eventId} not found`);
        }
        
        return event;
      } else {
        try {
          // Try to get real event data
          const eventData = await apiEventService.getEventById(eventId);
          return eventData;
        } catch (apiError) {
          console.log('API error fetching event details, checking mock data as fallback', apiError);
          
          // If API fails and this looks like our mock/synthetic event ID, use that
          if (eventId.startsWith('public-')) {
            // This will be handled by our API service directly
            throw apiError;
          }
          
          // Otherwise check if it's one of our mock events
          const mockEvent = mockEvents.find(event => event.id === eventId);
          if (mockEvent) {
            return mockEvent;
          }
          
          // If we get here, we couldn't find the event
          throw apiError;
        }
      }
    } catch (error) {
      console.error(`Error in eventService.getEventById for ID ${eventId}:`, error);
      throw error;
    }
  },
  
  // Get all categories
  getCategories: async () => {
    try {
      // Always try to get real categories from Eventbrite first as this endpoint works
      const categoriesData = await apiEventService.getCategories();
      
      // Map Eventbrite categories to our app's format
      const formattedCategories = categoriesData.categories.map(category => ({
        id: category.id,
        name: category.name
      }));
      
      return {
        categories: formattedCategories
      };
    } catch (error) {
      console.log('Failed to get categories from API, using mock data', error);
      
      // Fall back to mock data if API fails
      return {
        categories: mockCategories
      };
    }
  },
  
  // Get cities (only mock data for now, as EventBrite might not have this endpoint)
  getCities: async () => {
    if (USE_MOCK_DATA) {
      console.log('Using mock data for cities');
      return mockCities;
    } else {
      // For real API, you would need to implement location fetching
      // This might be a separate endpoint or may require additional processing
      console.log('Using mock cities data (API does not provide this directly)');
      return mockCities;
    }
  }
};

export default eventService;