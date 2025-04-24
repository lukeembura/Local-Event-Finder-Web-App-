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