import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EventCard from './EventCard';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import { useEvents } from '../../contexts/EventContext';

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const NoEventsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #F7FAFC;
  border-radius: var(--radius-lg);
  margin: 2rem 0;
  border: 1px solid #E2E8F0;
`;

const EventList = () => {
  const { events, loading, error} = useEvents();
  
  // Use an effect with a longer delay to smoothly handle loading states
  const [showLoading, setShowLoading] = useState(false);
  
  // Keep reference to previous events to prevent layout shift during loading
  const [stableEvents, setStableEvents] = useState([]);
  
  // Update stable events only when not loading or when we have new events
  useEffect(() => {
    if (!loading && events && events.length > 0) {
      setStableEvents(events);
    }
  }, [loading, events]);
  
  useEffect(() => {
    // Only show loading indicator if loading takes more than 800ms
    // This prevents flicker for quick loads
    let timer;
    
    if (loading) {
      // Delay showing the loading indicator
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 800);
    } else {
      // When loading stops, we don't immediately hide the loader
      // Instead, we wait a short time to ensure we don't flicker between states
      timer = setTimeout(() => {
        setShowLoading(false);
      }, 100);
    }
    
    return () => clearTimeout(timer);
  }, [loading]);
  
  // Handle error state
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  // Handle no events state
  if (!loading && events && events.length === 0) {
    return (
      <NoEventsMessage className="text-center p-12 bg-gray-50 rounded-lg my-8">
        <h3 className="text-xl font-semibold mb-2">No events found</h3>
        <p className="text-gray-600">
          Please check back later for upcoming events.
        </p>
      </NoEventsMessage>
    );
  }
  
  // Use stable events when loading, otherwise use current events
  const displayedEvents = loading ? stableEvents : events;
  
  return (
    <div style={{ minHeight: events && events.length > 0 ? '500px' : 'auto', position: 'relative' }}>
      {/* Loading overlay with fade-in/out transitions */}
      <div 
        className="flex justify-center my-8"
        style={{ 
          position: showLoading ? 'absolute' : 'static',
          top: '50%',
          left: '50%',
          transform: showLoading ? 'translate(-50%, -50%)' : 'none',
          zIndex: 10,
          opacity: showLoading ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: showLoading ? 'auto' : 'none',
          width: '100%'
        }}
      >
        {showLoading && <Loading message="Loading events..." />}
      </div>
      
      {/* Always render the grid, with smooth opacity transition */}
      <EventsGrid 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8"
        style={{ 
          opacity: showLoading ? 0.3 : 1, 
          transition: 'opacity 0.3s ease',
          filter: showLoading ? 'blur(2px)' : 'none'
        }}
      >
        {displayedEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </EventsGrid>
    </div>
  );
};

export default EventList;