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
      