import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import EventList from '../components/events/EventList';
import { useEvents } from '../contexts/EventContext';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-primary);
`;

const PageDescription = styled.p`
  color: var(--color-text);
  margin-bottom: 2rem;
`;

const EventsPage = () => {
  const [searchParams] = useSearchParams();
  const { updateFilters } = useEvents();
  
  // Extract filter values from URL parameters
  useEffect(() => {
    // Get values from URL parameters if they exist
    const category = searchParams.get('category') || '';
    const city = searchParams.get('city') || '';
    
    // Apply any filters from URL, otherwise show all events
    if (category || city) {
      updateFilters({
        category,
        city
      });
    }
    
    // Update the page title based on filters
    if (category && city) {
      document.title = `${category} Events in ${city} | Local Event Finder`;
    } else if (category) {
      document.title = `${category} Events | Local Event Finder`;
    } else if (city) {
      document.title = `Events in ${city} | Local Event Finder`;
    } else {
      document.title = "All Events | Local Event Finder";
    }
  }, [searchParams, updateFilters]);
  
  return (
    <PageContainer className="max-w-6xl mx-auto px-4 py-8">
      <PageTitle className="text-3xl font-semibold text-primary mb-2">
        Events in Kenya
      </PageTitle>
      <PageDescription className="text-gray-700 mb-8">
        Browse through events happening in cities across Kenya.
      </PageDescription>
      
      <EventList />
    </PageContainer>
  );
};

export default EventsPage;