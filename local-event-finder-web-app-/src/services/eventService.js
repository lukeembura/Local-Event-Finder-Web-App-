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