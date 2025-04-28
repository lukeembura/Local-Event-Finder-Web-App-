import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEvents } from '../contexts/EventContext';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: #64748b;
`;

const BreadcrumbLink = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const EventHeader = styled.div`
  margin-bottom: 2rem;
`;

const EventTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-primary);
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
`;

const Category = styled.span`
  display: inline-block;
  background-color: var(--color-accent);
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
`;

const EventContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const ImageWrapper = styled.div`
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const EventImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Description = styled.div`
  color: var(--color-text);
  line-height: 1.6;
  
  p {
    margin-bottom: 1rem;
  }
`;

const Sidebar = styled.div``;

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-primary);
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  display: flex;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.span`
  margin-right: 0.75rem;
  color: var(--color-primary);
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.p`
  color: var(--color-text);
  font-weight: 500;
`;

const TicketInfo = styled.div`
  margin-top: 1.5rem;
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 1rem;
`;

const TicketButton = styled.a`
  display: block;
  width: 100%;
  background-color: var(--color-secondary);
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e05a2b;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: none;
  margin-top: 2rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const EventDetailPage = () => {
  const { id } = useParams();
  const { getEventById } = useEvents();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const eventData = await getEventById(id);
        setEvent(eventData);
        setError(null);
      } catch (err) {
        console.error(`Error fetching event with ID ${id}:`, err);
        setError(`Unable to load event details. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventDetails();
  }, [id, getEventById]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-KE', options);
  };
  
  if (loading) {
    return (
      <DetailContainer className="max-w-6xl mx-auto px-4 py-8">
        <Loading message="Loading event details..." />
      </DetailContainer>
    );
  }
  
  if (error || !event) {
    return (
      <DetailContainer className="max-w-6xl mx-auto px-4 py-8">
        <ErrorMessage message={error || "Event not found"} />
        <BackButton to="/events" className="inline-flex items-center text-primary font-medium hover:underline mt-8">
          ← Back to Events
        </BackButton>
      </DetailContainer>
    );
  }
  
  return (
    <DetailContainer className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <BreadcrumbLink to="/" className="text-primary hover:underline">Home</BreadcrumbLink>
        <span>/</span>
        <BreadcrumbLink to="/events" className="text-primary hover:underline">Events</BreadcrumbLink>
        <span>/</span>
        <span>{event.name.text}</span>
      </Breadcrumbs>
      
      <EventHeader>
        <Category className="inline-block bg-accent text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
          {event.category}
        </Category>
        <EventTitle className="text-4xl font-bold text-primary mb-4">
          {event.name.text}
        </EventTitle>
        
        <EventMeta className="flex flex-wrap gap-6 mb-6 text-gray-500">
          <MetaItem className="flex items-center gap-2">
            <span role="img" aria-label="calendar">📅</span> {formatDate(event.start.local)}
          </MetaItem>
          <MetaItem className="flex items-center gap-2">
            <span role="img" aria-label="location">📍</span> {event.venue.name}, {event.venue.address.city}
          </MetaItem>
          <MetaItem className="flex items-center gap-2">
            <span role="img" aria-label="organizer">👥</span> Organized by {event.organizer.name}
          </MetaItem>
        </EventMeta>
      </EventHeader>
      
      <EventContent className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MainContent className="lg:col-span-2">
          <ImageWrapper className="rounded-lg overflow-hidden mb-8">
            <EventImage 
              src={event.logo?.url || 'https://placehold.co/800x400/png?text=No+Image'} 
              alt={event.name.text}
              className="w-full h-auto object-cover"
            />
          </ImageWrapper>
          
          <CardTitle className="text-xl font-semibold text-primary mb-4">Event Description</CardTitle>
          <Description className="text-gray-700 leading-relaxed">
            <p>{event.description.text}</p>
          </Description>
        </MainContent>
        
        <Sidebar>
          <Card className="bg-white rounded-lg shadow-md p-6 mb-6">
            <CardTitle className="text-xl font-semibold text-primary mb-4">Event Details</CardTitle>
            <InfoList>
              <InfoItem className="flex mb-4">
                <InfoIcon className="mr-3 text-primary">📅</InfoIcon>
                <InfoContent>
                  <InfoLabel className="text-sm text-gray-500 mb-1">Date and Time</InfoLabel>
                  <InfoValue className="text-gray-800 font-medium">{formatDate(event.start.local)}</InfoValue>
                  {event.end && (
                    <InfoValue className="text-gray-800 font-medium">
                      to {formatDate(event.end.local)}
                    </InfoValue>
                  )}
                </InfoContent>
              </InfoItem>
              
              <InfoItem className="flex mb-4">
                <InfoIcon className="mr-3 text-primary">📍</InfoIcon>
                <InfoContent>
                  <InfoLabel className="text-sm text-gray-500 mb-1">Location</InfoLabel>
                  <InfoValue className="text-gray-800 font-medium">{event.venue.name}</InfoValue>
                  <InfoValue className="text-gray-800">
                    {event.venue.address.address_1}, {event.venue.address.city}, Kenya
                  </InfoValue>
                </InfoContent>
              </InfoItem>
              
              <InfoItem className="flex mb-4">
                <InfoIcon className="mr-3 text-primary">👥</InfoIcon>
                <InfoContent>
                  <InfoLabel className="text-sm text-gray-500 mb-1">Organizer</InfoLabel>
                  <InfoValue className="text-gray-800 font-medium">{event.organizer.name}</InfoValue>
                </InfoContent>
              </InfoItem>
              
              <InfoItem className="flex">
                <InfoIcon className="mr-3 text-primary">🎟️</InfoIcon>
                <InfoContent>
                  <InfoLabel className="text-sm text-gray-500 mb-1">Capacity</InfoLabel>
                  <InfoValue className="text-gray-800 font-medium">{event.capacity} attendees</InfoValue>
                </InfoContent>
              </InfoItem>
            </InfoList>
            
            <TicketInfo className="mt-6 pt-6 border-t border-gray-200">
              <Price className="text-2xl font-bold text-secondary mb-4">
                {event.is_free ? 'Free' : event.ticket_price}
              </Price>
              <TicketButton 
                href={event.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-secondary text-white font-semibold text-center py-3 px-4 rounded-md hover:bg-secondary-dark transition-colors"
              >
                {event.is_free ? 'Register' : 'Get Tickets'}
              </TicketButton>
            </TicketInfo>
          </Card>
          
          <Card className="bg-white rounded-lg shadow-md p-6">
            <CardTitle className="text-xl font-semibold text-primary mb-4">Share Event</CardTitle>
            <div className="flex gap-4">
              <button className="text-primary hover:text-primary-dark text-2xl" title="Share on Facebook">
                📱
              </button>
              <button className="text-primary hover:text-primary-dark text-2xl" title="Share on Twitter">
                📱
              </button>
              <button className="text-primary hover:text-primary-dark text-2xl" title="Share on WhatsApp">
                📱
              </button>
              <button className="text-primary hover:text-primary-dark text-2xl" title="Share via Email">
                📧
              </button>
            </div>
          </Card>
        </Sidebar>
      </EventContent>
      
      <BackButton to="/events" className="inline-flex items-center text-primary font-medium hover:underline mt-8">
        ← Back to Events
      </BackButton>
    </DetailContainer>
  );
};

export default EventDetailPage;