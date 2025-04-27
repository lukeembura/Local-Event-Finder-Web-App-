import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #FFFFFF; /* White background */
  border-radius: 8px; /* Eventbrite uses subtle radius */
  box-shadow: 0 2px 6px rgba(40, 28, 60, 0.1); /* Subtle shadow */
  overflow: hidden;
  transition: all 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #EEEDF2; /* Eventbrite border color */
  
  /* Eventbrite uses clean design with no patterns */
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(40, 28, 60, 0.15);
    border-color: #DBDAE3;
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
  z-index: 0;
`;

const CardImage = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
  
  /* Eventbrite uses simple image treatment */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 1;
  }
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top, 
    rgba(0,0,0,0.7) 0%, 
    rgba(0,0,0,0.4) 30%,
    rgba(0,0,0,0) 60%
  );
  z-index: 2;
`;

const EventDate = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: white;
  color: #1E0A3C; /* Dark purple */
  border-radius: 4px; /* Eventbrite uses square-ish date displays */
  padding: 0;
  font-weight: 500;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(40, 28, 60, 0.15);
  width: 54px;
`;

const EventDay = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
  color: #1E0A3C; /* Dark purple */
  padding: 8px 0 2px;
  width: 100%;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
`;

const EventMonth = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  width: 100%;
  padding: 2px 0 6px;
  background-color: #D1410C; /* Eventbrite orange */
  color: white;
  font-weight: 500;
  letter-spacing: 0.05em;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px; /* Eventbrite places badges on the right */
  background: #D1410C; /* Eventbrite orange */
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 10;
  display: flex;
  align-items: center;
`;

const CardContent = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 5;
`;

const EventCategory = styled.span`
  display: inline-block;
  color: #6F7287; /* Eventbrite medium gray */
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const EventTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  margin-top: 0;
  color: #1E0A3C; /* Eventbrite dark purple */
  line-height: 1.35;
  font-family: 'Inter', sans-serif;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: #3659E3; /* Eventbrite blue */
    }
  }
`;

const EventInfo = styled.div`
  margin-bottom: 8px;
`;

const EventInfoItem = styled.p`
  font-size: 0.875rem;
  color: #6F7287;  /* Eventbrite medium gray */
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  svg, span[role="img"] {
    color: #6F7287; /* Same color as text in Eventbrite */
    font-size: 1rem;
    display: flex;
    align-items: center;
    width: 18px;
  }
`;

const EventPrice = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const Price = styled.p`
  font-weight: 600;
  font-size: 0.875rem;
  color: #1E0A3C; /* Eventbrite dark purple */
`;

const FreeBadge = styled.span`
  color: #3659E3; /* Eventbrite blue */
  font-weight: 600;
  font-size: 0.875rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #EEEDF2; /* Eventbrite subtle border */
  background-color: #FFFFFF; /* White background */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const OrganizerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OrganizerAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #F8F7FA; /* Light gray background */
  border: 1px solid #EEEDF2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1E0A3C; /* Dark purple */
  font-weight: 600;
  font-size: 0.75rem;
`;

const OrganizerName = styled.p`
  font-size: 0.8125rem;
  color: #6F7287; /* Eventbrite medium gray */
  font-weight: 400;
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #FFFFFF;
  color: #3659E3; /* Eventbrite blue */
  font-weight: 600;
  font-size: 0.875rem;
  padding: 8px 12px;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid #DBDAE3; /* Eventbrite border color */
  font-family: 'Inter', sans-serif;
  
  &:hover {
    background-color: #F8F7FA;
    border-color: #A9A8B3;
    color: #3659E3; /* Eventbrite blue */
    text-decoration: none;
  }
  
  span:last-child {
    transition: all 0.2s ease;
  }
  
  &:hover span:last-child {
    transform: translateX(3px);
  }
`;

const EventCard = ({ event, featured = false }) => {
  // Format date components - handle both formats (mock and API)
  const startDate = event.start.local || (event.start.utc ? new Date(event.start.utc).toISOString() : new Date().toISOString());
  const eventDate = new Date(startDate);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('en-KE', { month: 'short' });
  
  // Format full date - handles both ISO strings and objects
  const formatDate = (dateObj) => {
    const options = { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    // Handle either format (string or object with local/utc)
    let dateString;
    if (typeof dateObj === 'string') {
      dateString = dateObj;
    } else if (dateObj && (dateObj.local || dateObj.utc)) {
      dateString = dateObj.local || dateObj.utc;
    } else {
      return 'Date TBD';
    }
    
    return new Date(dateString).toLocaleDateString('en-KE', options);
  };
  
  // Get organizer initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Card className="card fade-in">
      <CardImageContainer>
        <CardImage 
          style={{ backgroundImage: `url(${
            // Handle different image formats from API
            event.logo?.url || 
            event.logo?.original?.url || 
            'https://placehold.co/600x400/png?text=No+Image'
          })` }}
        />
        <ImageOverlay />
        <EventDate>
          <EventDay>{day}</EventDay>
          <EventMonth>{month}</EventMonth>
        </EventDate>
        {featured && <FeaturedBadge>Featured</FeaturedBadge>}
      </CardImageContainer>
      
      <CardContent>
        <EventCategory style={{ backgroundColor: 
          (event.category?.name || event.category) === 'Technology' ? '#3498DB' : 
          (event.category?.name || event.category) === 'Music' ? '#9B59B6' : 
          (event.category?.name || event.category) === 'Business' ? '#2ECC71' : 
          (event.category?.name || event.category) === 'Food & Drink' ? '#F39C12' : 
          (event.category?.name || event.category) === 'Sports & Fitness' ? '#E74C3C' : 
          (event.category?.name || event.category) === 'Arts & Culture' ? '#1ABC9C' : 
          'var(--color-accent)' 
        }}>
          {/* Handle different category formats from API */}
          {event.category?.name || event.category || 'Event'}
        </EventCategory>
        
        <EventTitle>
          <Link to={`/events/${event.id}`}>
            {/* Handle different name formats from API */}
            {event.name.text || event.name.html || event.name || 'Event Name'}
          </Link>
        </EventTitle>
        
        <EventInfo>
          <EventInfoItem>
            <span role="img" aria-label="calendar">📅</span> 
            <span>{formatDate(event.start)}</span>
          </EventInfoItem>
          <EventInfoItem>
            <span role="img" aria-label="location">📍</span> 
            <span>
              {/* Handle different venue formats from API */}
              {event.venue?.name ? `${event.venue.name}, ${event.venue.address?.city || 'Unknown Location'}` : 'Location TBD'}
            </span>
          </EventInfoItem>
        </EventInfo>
        
        <EventPrice>
          {event.is_free ? (
            <FreeBadge>Free</FreeBadge>
          ) : (
            <Price>{event.ticket_price || 'Paid Event'}</Price>
          )}
        </EventPrice>
      </CardContent>
      
      <CardFooter>
        <OrganizerInfo>
          <OrganizerAvatar>
            {/* Handle different organizer formats from API */}
            {getInitials(event.organizer?.name || 'Event Organizer')}
          </OrganizerAvatar>
          <OrganizerName>{event.organizer?.name || 'Event Organizer'}</OrganizerName>
        </OrganizerInfo>
        <ViewButton to={`/events/${event.id}`}>
          <span>Details</span>
          <span>→</span>
        </ViewButton>
      </CardFooter>
    </Card>
  );
};

export default EventCard;