import React, { createContext, useState, useEffect, useContext } from 'react';
import eventService from '../services/eventService';

// Create context
const EventContext = createContext();

// Custom hook for using the event context
export const useEvents = () => {
  return useContext(EventContext);
};

export const EventProvider = ({ children }) => {
  // State for events, categories, cities, loading and error
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Simplified filters state - only city and category
  const [filters, setFilters] = useState({
    city: '',
    category: ''
  });

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Fetch categories and cities in parallel
        const [categoriesData, citiesData] = await Promise.all([
          eventService.getCategories(),
          eventService.getCities()
        ]);
        
        setCategories(categoriesData.categories || categoriesData);
        setCities(citiesData);
        
        // Then fetch events with no filters
        const eventsData = await eventService.getEvents();
        setEvents(eventsData.events || []);
        
        setError(null);
      } catch (err) {
        console.error('Error loading initial data:', err);
        
        // Using mock data as a fallback
        try {
          console.log('Falling back to mock data...');
          
          // Set error message but keep it user-friendly
          setError('Using demo data (Eventbrite API connection issue)');
          
          // Import mockData directly here as a fallback
          const { mockEvents, mockCategories, mockCities } = await import('../data/mockEvents');
          setCategories(mockCategories);
          setCities(mockCities);
          setEvents(mockEvents);
          
          // After a delay, clear the error message to improve UX
          setTimeout(() => {
            setError(null);
          }, 3000);
        } catch (fallbackErr) {
          console.error('Error loading fallback data:', fallbackErr);
          setError('Failed to load data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);
  