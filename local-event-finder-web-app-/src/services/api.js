import axios from 'axios';

// Base URL for EventBrite API
const API_BASE_URL = 'https://www.eventbriteapi.com/v3';

// Create axios instance with base configuration for EventBrite API
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_EVENTBRITE_API_KEY}`,
  }
});

// Event services
export const eventService = {
  // Get events with optional filters (location, category, date range, etc.)
  getEvents: async (params) => {
    try {
      // Convert our app's params to EventBrite API format
      const apiParams = { ...params };
      
      // Convert location parameters
      if (params['location.address'] === 'Kenya') {
        apiParams['location.address'] = 'Kenya';
      }
      
      // Handle city filtering - Convert to EventBrite's location.within format
      if (params.city) {
        apiParams['location.within'] = '10km';
        apiParams['location.address'] = params.city + ', Kenya';
        delete apiParams.city;
      }
      
      // Handle category filtering
      if (params.category && !params.category.includes(',')) {
        // Find category ID based on name, if needed
        // For now, we'll just use the name directly
        apiParams.categories = params.category;
        delete apiParams.category;
      }
      
      // Handle date filtering
      if (params.startDate) {
        apiParams['start_date.range_start'] = params.startDate;
        delete apiParams.startDate;
      }
      
      if (params.endDate) {
        apiParams['start_date.range_end'] = params.endDate;
        delete apiParams.endDate;
      }
      
      // Make request to EventBrite API
      try {
        const response = await api.get('/events/search/', { params: apiParams });
        
        // Process and return the results
        return {
          events: response.data.events || [],
          pagination: response.data.pagination || {
            page_count: 1,
            page_size: (response.data.events || []).length,
            page_number: 1,
            has_more_items: false
          }
        };
      } catch (eventbriteError) {
        console.error('Error fetching from EventBrite API:', eventbriteError);
        
        // Fallback to our mock data approach if EventBrite API fails
        console.log('Falling back to mock data generation...');
        
        // Making request to placeholder API as fallback
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: { _limit: 10 } // Limit to 10 posts
        });
        
        // Transform the API data into our expected events format
        const events = response.data.map((post, index) => ({
          id: `public-${post.id}`,
          name: {
            text: `Kenya ${index % 5 === 0 ? 'Tech Summit' : 
                  index % 5 === 1 ? 'Business Conference' : 
                  index % 5 === 2 ? 'Music Festival' : 
                  index % 5 === 3 ? 'Art Exhibition' : 'Food Festival'} ${index + 1}`,
            html: `Kenya ${index % 5 === 0 ? 'Tech Summit' : 
                  index % 5 === 1 ? 'Business Conference' : 
                  index % 5 === 2 ? 'Music Festival' : 
                  index % 5 === 3 ? 'Art Exhibition' : 'Food Festival'} ${index + 1}`
          },
          description: {
            text: `Join us for the ${index % 5 === 0 ? 'biggest technology conference' : 
                   index % 5 === 1 ? 'premier business networking event' : 
                   index % 5 === 2 ? 'exciting music festival' : 
                   index % 5 === 3 ? 'stunning art exhibition' : 'delicious food festival'} in Kenya! Experience the best of ${
                   index % 3 === 0 ? 'Nairobi' : (index % 3 === 1 ? 'Mombasa' : 'Kisumu')
                   } with local experts and international guests.`,
            html: `<p>Join us for the ${index % 5 === 0 ? 'biggest technology conference' : 
                  index % 5 === 1 ? 'premier business networking event' : 
                  index % 5 === 2 ? 'exciting music festival' : 
                  index % 5 === 3 ? 'stunning art exhibition' : 'delicious food festival'} in Kenya! Experience the best of ${
                  index % 3 === 0 ? 'Nairobi' : (index % 3 === 1 ? 'Mombasa' : 'Kisumu')
                  } with local experts and international guests.</p>`
          },
          start: {
            local: new Date(Date.now() + (index * 24 * 60 * 60 * 1000)).toISOString(),
            timezone: 'Africa/Nairobi'
          },
          end: {
            local: new Date(Date.now() + ((index + 1) * 24 * 60 * 60 * 1000)).toISOString(),
            timezone: 'Africa/Nairobi'
          },
          venue: {
            name: index % 2 === 0 ? 'Sarit Centre' : 'KICC',
            address: {
              city: index % 3 === 0 ? 'Nairobi' : (index % 3 === 1 ? 'Mombasa' : 'Kisumu'),
              country: 'Kenya',
              address_1: 'Main Street'
            }
          },
          logo: {
            url: `https://placehold.co/600x400/random?text=Event+${post.id}`
          },
          category: index % 5 === 0 ? 'Technology' : 
                  index % 5 === 1 ? 'Business' : 
                  index % 5 === 2 ? 'Music' : 
                  index % 5 === 3 ? 'Arts & Culture' : 'Food & Drink',
          capacity: 100 + (index * 50),
          url: '#',
          is_free: index % 2 === 0,
          ticket_price: index % 2 === 0 ? '' : `Ksh ${1000 + (index * 500)}`,
          organizer: {
            name: index % 4 === 0 ? 'Kenya Events Ltd' : 
                  index % 4 === 1 ? 'City Tours' : 
                  index % 4 === 2 ? 'Tech Community Kenya' : 'Arts Association'
          }
        }));
        
        // Filter based on original params
        let filteredEvents = [...events];
        
        // Handle basic filtering
        if (params) {
          // City filtering
          if (params.city) {
            filteredEvents = filteredEvents.filter(event => 
              event.venue.address.city.toLowerCase() === params.city.toLowerCase()
            );
          }
          
          // Category filtering
          if (params.category) {
            filteredEvents = filteredEvents.filter(event => 
              event.category.toLowerCase() === params.category.toLowerCase()
            );
          }
          
          // Text search
          if (params.query) {
            const query = params.query.toLowerCase();
            filteredEvents = filteredEvents.filter(event => 
              event.name.text.toLowerCase().includes(query) || 
              event.description.text.toLowerCase().includes(query)
            );
          }
          
          // Date filtering
          if (params.startDate) {
            const startDate = new Date(params.startDate);
            filteredEvents = filteredEvents.filter(event => 
              new Date(event.start.local) >= startDate
            );
          }
          
          if (params.endDate) {
            const endDate = new Date(params.endDate);
            filteredEvents = filteredEvents.filter(event => 
              new Date(event.start.local) <= endDate
            );
          }
        }
        
        // Return in expected format
        return {
          events: filteredEvents,
          pagination: {
            page_count: 1,
            page_size: filteredEvents.length,
            page_number: 1,
            has_more_items: false
          }
        };
      }
    } catch (error) {
      console.error('Error in getEvents:', error);
      throw error;
    }
  },

  // Get event details by ID
  getEventById: async (eventId) => {
    try {
      // First, try to get event details from EventBrite API
      try {
        // If it's not a 'public-' prefixed ID (our mock data), try EventBrite API
        if (!eventId.startsWith('public-')) {
          const response = await api.get(`/events/${eventId}/`);
          return response.data;
        } else {
          // This is one of our mock event IDs
          throw new Error('Mock event ID, using fallback');
        }
      } catch (eventbriteError) {
        console.log('Could not fetch from EventBrite API, using fallback:', eventbriteError.message);
        
        // Fallback for mock data or when EventBrite API fails
        // If this is one of our public API generated events
        if (eventId.startsWith('public-')) {
          const postId = eventId.replace('public-', '');
          try {
            // Fetch the specific post
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const postData = response.data;
            
            // Transform it to look like an event
            const index = parseInt(postId); // Use post ID for deterministic event properties
            return {
              id: eventId,
              name: {
                text: `Kenya ${index % 5 === 0 ? 'Tech Summit' : 
                      index % 5 === 1 ? 'Business Conference' : 
                      index % 5 === 2 ? 'Music Festival' : 
                      index % 5 === 3 ? 'Art Exhibition' : 'Food Festival'} ${index}`,
                html: `Kenya ${index % 5 === 0 ? 'Tech Summit' : 
                      index % 5 === 1 ? 'Business Conference' : 
                      index % 5 === 2 ? 'Music Festival' : 
                      index % 5 === 3 ? 'Art Exhibition' : 'Food Festival'} ${index}`
              },
              description: {
                text: `Join us for the ${index % 5 === 0 ? 'biggest technology conference' : 
                       index % 5 === 1 ? 'premier business networking event' : 
                       index % 5 === 2 ? 'exciting music festival' : 
                       index % 5 === 3 ? 'stunning art exhibition' : 'delicious food festival'} in Kenya! Experience the best of ${
                       index % 3 === 0 ? 'Nairobi' : (index % 3 === 1 ? 'Mombasa' : 'Kisumu')
                       } with local experts and international guests.`,
                html: `<p>Join us for the ${index % 5 === 0 ? 'biggest technology conference' : 
                       index % 5 === 1 ? 'premier business networking event' : 
                       index % 5 === 2 ? 'exciting music festival' : 
                       index % 5 === 3 ? 'stunning art exhibition' : 'delicious food festival'} in Kenya! Experience the best of ${
                       index % 3 === 0 ? 'Nairobi' : (index % 3 === 1 ? 'Mombasa' : 'Kisumu')
                       } with local experts and international guests.</p>
                       
                       <h3>Event Details</h3>
                       <p>This spectacular event will take place at the beautiful ${
                       index % 2 === 0 ? 'Sarit Centre' : 'KICC'} in ${
                       index % 3 === 0 ? 'Nairobi' : (index % 3 === 1 ? 'Mombasa' : 'Kisumu')
                       }. We have an amazing lineup of activities planned for you!</p>
                       
                       <h4>Featured Highlights:</h4>
                       <ul>
                         <li>${index % 5 === 0 ? 'Cutting-edge tech demonstrations' : 
                              index % 5 === 1 ? 'Business leadership panels' : 
                              index % 5 === 2 ? 'Live performances by top Kenyan artists' : 
                              index % 5 === 3 ? 'Works from renowned Kenyan artists' : 
                              'Cuisine from Kenya\'s top chefs'}</li>
                         <li>Networking opportunities with industry leaders</li>
                         <li>${index % 5 === 0 ? 'Coding competitions' : 
                              index % 5 === 1 ? 'Investment opportunities' : 
                              index % 5 === 2 ? 'Dance performances' : 
                              index % 5 === 3 ? 'Interactive art installations' : 
                              'Cooking demonstrations'}</li>
                         <li>VIP reception with refreshments and entertainment</li>
                       </ul>
                       
                       <h4>Why Attend?</h4>
                       <p>This is a unique opportunity to experience the vibrant culture and innovation of Kenya. Don't miss your chance to be part of this extraordinary event!</p>
                       
                       <p><strong>Limited tickets available - book now to secure your spot!</strong></p>`
              },
              start: {
                local: new Date(Date.now() + (index * 24 * 60 * 60 * 1000)).toISOString(),
                timezone: 'Africa/Nairobi'
              },
              end: {
                local: new Date(Date.now() + ((index + 1) * 24 * 60 * 60 * 1000)).toISOString(),
                timezone: 'Africa/Nairobi'
              },
              venue: {
                name: index % 2 === 0 ? 'Sarit Centre' : 'KICC',
                address: {
                  city: index % 3 === 0 ? 'Nairobi' : (index % 3 === 1 ? 'Mombasa' : 'Kisumu'),
                  country: 'Kenya',
                  address_1: 'Main Street',
                  address_2: index % 2 === 0 ? '2nd Floor' : 'Conference Room A'
                }
              },
              logo: {
                url: `https://placehold.co/800x400/random?text=Event+${postId}`
              },
              category: index % 5 === 0 ? 'Technology' : 
                      index % 5 === 1 ? 'Business' : 
                      index % 5 === 2 ? 'Music' : 
                      index % 5 === 3 ? 'Arts & Culture' : 'Food & Drink',
              capacity: 100 + (index * 50),
              url: '#',
              is_free: index % 2 === 0,
              ticket_price: index % 2 === 0 ? '' : `Ksh ${1000 + (index * 500)}`,
              organizer: {
                name: index % 4 === 0 ? 'Kenya Events Ltd' : 
                      index % 4 === 1 ? 'City Tours' : 
                      index % 4 === 2 ? 'Tech Community Kenya' : 'Arts Association',
                description: 'Leading event organizer in Kenya',
                website: 'https://example.com'
              }
            };
          } catch (fallbackError) {
            console.error(`Error in fallback for event ID ${eventId}:`, fallbackError);
            throw new Error(`Event with ID ${eventId} not found.`);
          }
        } else {
          // Not a mock ID and EventBrite API failed
          throw new Error(`Event with ID ${eventId} not found.`);
        }
      }
    } catch (error) {
      console.error(`Error fetching event with ID ${eventId}:`, error);
      throw error;
    }
  },

  // Get categories from EventBrite API
  getCategories: async () => {
    try {
      const response = await api.get('/categories/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories from EventBrite:', error);
      
      // Return mock categories in same format as EventBrite
      return {
        categories: [
          { id: "101", name: "Business & Professional" },
          { id: "102", name: "Science & Technology" },
          { id: "103", name: "Music" },
          { id: "104", name: "Film, Media & Entertainment" },
          { id: "105", name: "Arts & Culture" },
          { id: "106", name: "Food & Drink" },
          { id: "107", name: "Community & Culture" },
          { id: "108", name: "Fashion & Beauty" },
          { id: "109", name: "Sports & Fitness" },
          { id: "110", name: "Health & Wellness" }
        ],
        pagination: {
          object_count: 10,
          page_number: 1,
          page_size: 10,
          page_count: 1,
          has_more_items: false
        }
      };
    }
  },
  
  // Get popular events from EventBrite API
  getPopularEvents: async () => {
    try {
      // Try to get popular events in Kenya
      const response = await api.get('/events/search/', {
        params: {
          'location.address': 'Kenya',
          sort_by: 'popularity'
        }
      });
      
      return {
        events: response.data.events || [],
        pagination: response.data.pagination || {
          page_count: 1,
          page_size: 0,
          page_number: 1,
          has_more_items: false
        }
      };
    } catch (error) {
      console.error('Error fetching popular events from EventBrite:', error);
      
      // Generate mock events to return as popular events
      const mockPopularEvents = [];
      
      for (let i = 1; i <= 5; i++) {
        mockPopularEvents.push({
          id: `popular-${i}`,
          name: {
            text: `${i % 3 === 0 ? 'Nairobi Tech Week' : 
                 i % 3 === 1 ? 'Mombasa Music Festival' : 
                 'Eldoret Cultural Exhibition'} ${i}`,
            html: `${i % 3 === 0 ? 'Nairobi Tech Week' : 
                  i % 3 === 1 ? 'Mombasa Music Festival' : 
                  'Eldoret Cultural Exhibition'} ${i}`
          },
          description: {
            text: `A premier ${i % 3 === 0 ? 'technology' : 
                   i % 3 === 1 ? 'music' : 
                   'cultural'} event in Kenya!`,
            html: `<p>A premier ${i % 3 === 0 ? 'technology' : 
                   i % 3 === 1 ? 'music' : 
                   'cultural'} event in Kenya!</p>`
          },
          start: {
            local: new Date(Date.now() + (i * 48 * 60 * 60 * 1000)).toISOString(),
            timezone: 'Africa/Nairobi'
          },
          end: {
            local: new Date(Date.now() + (i * 48 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000)).toISOString(),
            timezone: 'Africa/Nairobi'
          },
          venue: {
            name: i % 3 === 0 ? 'KICC' : (i % 3 === 1 ? 'Nyali Beach' : 'Eldoret Sports Club'),
            address: {
              city: i % 3 === 0 ? 'Nairobi' : (i % 3 === 1 ? 'Mombasa' : 'Eldoret'),
              country: 'Kenya',
              address_1: 'Main Street'
            }
          },
          logo: {
            url: `https://placehold.co/600x400/random?text=Popular+Event+${i}`
          },
          category: i % 3 === 0 ? 'Technology' : (i % 3 === 1 ? 'Music' : 'Arts & Culture'),
          is_free: i % 2 === 0,
          ticket_price: i % 2 === 0 ? '' : `Ksh ${2000 + (i * 500)}`,
          organizer: {
            name: i % 3 === 0 ? 'Tech Kenya' : (i % 3 === 1 ? 'Kenya Music Association' : 'Cultural Heritage Kenya')
          }
        });
      }
      
      return {
        events: mockPopularEvents,
        pagination: {
          page_count: 1,
          page_size: mockPopularEvents.length,
          page_number: 1,
          has_more_items: false
        }
      };
    }
  },

  // Get venues/locations in Kenya (can be filtered by city)
  getVenues: async (city) => {
    try {
      const params = {
        'location.address': 'Kenya',
        ...(city && { 'location.city': city }),
      };
      const response = await api.get('/venues/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching venues from EventBrite:', error);
      
      // Return mock venues data
      const mockVenues = [
        {
          id: 'v1',
          name: 'Kenyatta International Convention Centre (KICC)',
          address: {
            city: 'Nairobi',
            country: 'Kenya',
            address_1: 'City Square',
            postal_code: '00200'
          },
          capacity: 5000
        },
        {
          id: 'v2',
          name: 'Sarit Centre',
          address: {
            city: 'Nairobi',
            country: 'Kenya',
            address_1: 'Westlands',
            postal_code: '00800'
          },
          capacity: 1200
        },
        {
          id: 'v3',
          name: 'Nyali Beach Hotel',
          address: {
            city: 'Mombasa',
            country: 'Kenya',
            address_1: 'Nyali',
            postal_code: '80100'
          },
          capacity: 800
        },
        {
          id: 'v4',
          name: 'Eldoret Sports Club',
          address: {
            city: 'Eldoret',
            country: 'Kenya',
            address_1: 'Nandi Road',
            postal_code: '30100'
          },
          capacity: 500
        }
      ];
      
      // Filter by city if provided
      const filteredVenues = city 
        ? mockVenues.filter(venue => venue.address.city.toLowerCase() === city.toLowerCase())
        : mockVenues;
      
      return {
        venues: filteredVenues,
        pagination: {
          object_count: filteredVenues.length,
          page_number: 1,
          page_size: filteredVenues.length,
          page_count: 1,
          has_more_items: false
        }
      };
    }
  }
};

export default api;