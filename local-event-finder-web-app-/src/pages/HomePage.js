import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useEvents } from '../contexts/EventContext';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import EventCard from '../components/events/EventCard';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Hero = styled.section`
  background: #1E0A3C; /* Eventbrite dark purple background */
  color: #FFFFFF; /* White text */
  padding: 5rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  > * {
    position: relative;
    z-index: 3;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out forwards;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: #FFFFFF; /* White text for dark background */
  letter-spacing: -0.02em;
  
  span {
    color: #D1410C; /* Eventbrite orange */
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.5;
  color: #DBDAE3; /* Light gray for dark background */
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  max-width: 650px;
  margin: 0 auto 2rem;
  background-color: #FFFFFF;
  border-radius: 50px; /* Rounded corners */
  padding: 0;
  position: relative;
  z-index: 3;
  transition: all 0.2s ease;
  animation: ${fadeInUp} 1s 0.3s both;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  
  &:focus-within {
    box-shadow: 0 0 0 2px #3659E3, 0 4px 14px rgba(0, 0, 0, 0.1); /* Eventbrite blue focus ring */
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    border-radius: 8px;
  }
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  padding: 16px 20px;
  font-size: 1rem;
  outline: none;
  color: #1E0A3C; /* Eventbrite dark purple */
  background-color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  
  &::placeholder {
    color: #6F7287; /* Eventbrite medium gray */
    font-weight: 400;
  }
  
  &:focus {
    background-color: #FFFFFF;
  }
  
  @media (max-width: 640px) {
    margin-bottom: 0;
    border-bottom: 1px solid #EEEDF2;
  }
`;

const SearchButton = styled(Link)`
  background-color: #D1410C; /* Eventbrite orange */
  color: white;
  font-weight: 600;
  padding: 16px 24px;
  border-top-right-radius: 50px; /* Rounded corner on the right side */
  border-bottom-right-radius: 50px; /* Rounded corner on the right side */
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  
  &:hover {
    background-color: #B23709; /* Darker orange on hover */
    color: white;
    text-decoration: none;
  }
  
  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    border-radius: 50px; /* Fully rounded on mobile */
  }
`;

const PopularTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  max-width: 100%;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-bottom: 1rem;
  }
`;

const TagLink = styled(Link)`
  background-color: transparent;
  color: #FFFFFF; /* White on dark hero background */
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px; /* More rounded for better visibility */
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: inline-block;
  font-weight: 500;
  margin: 0.2rem;
  white-space: nowrap;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.8);
    color: #FFFFFF;
    text-decoration: none;
    transform: translateY(-2px);
  }
  
  /* Make "All Events" tag stand out */
  &:first-child {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
  }
`;

const Section = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #FFFFFF; /* White background */
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background-color: var(--color-secondary);
    margin: 1.5rem auto 0;
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1A202C; /* Dark text for white background */
  
  span {
    color: var(--color-secondary);
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  color: #4A5568; /* Dark gray for white background */
  line-height: 1.7;
  font-weight: 400;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: #FFFFFF; /* White background */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  border: 1px solid #E2E8F0;
  z-index: 1;
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: var(--shadow-lg);
    border-color: #CBD5E0;
  }
  
  /* Different subtle borders for each card */
  &:nth-child(1) {
    border-top: 3px solid #3182CE; /* Blue */
  }
  
  &:nth-child(2) {
    border-top: 3px solid #E53E3E; /* Red */
  }
  
  &:nth-child(3) {
    border-top: 3px solid #38A169; /* Green */
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%);
  color: white;
  width: 110px;
  height: 110px;
  line-height: 110px;
  border-radius: 50%;
  position: relative;
  box-shadow: var(--shadow-lg);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  ${FeatureCard}:hover & {
    transform: scale(1.1) rotate(10deg);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px dashed white;
    border-radius: 50%;
    opacity: 0.3;
    animation: spin 10s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: -10px;
    border: 2px dashed var(--color-accent);
    border-radius: 50%;
    opacity: 0.2;
    animation: spin 15s linear infinite reverse;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1A202C; /* Dark text for white background */
`;

const FeatureDescription = styled.p`
  color: #4A5568; /* Dark gray for white background */
  line-height: 1.7;
  font-size: 1.05rem;
  font-weight: 400;
`;

const CitiesSection = styled.section`
  background-color: #F7FAFC; /* Light gray background for subtle contrast */
  padding: 5rem 2rem;
  position: relative;
  border-top: 1px solid #E2E8F0;
  border-bottom: 1px solid #E2E8F0;
`;

const CitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  max-width: 1200px;
  margin: 0 auto;
  gap: 1.5rem;
`;

const CityCard = styled(Link)`
  position: relative;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
    
    img {
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 480px) {
    height: 150px;
  }
`;

const CityImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const CityOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%);
  z-index: 1;
`;

const CityName = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`;

const FeaturedEventsSection = styled.section`
  padding: 5rem 2rem;
  background: #FFFFFF; /* White background */
  position: relative;
  overflow: hidden;
`;

const FeaturedEventsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`;

const FeaturedEventsTitle = styled.div``;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3182CE; /* Bright blue for contrast */
  font-weight: 600;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 2px solid #3182CE;
  border-radius: 50px;
  transition: all 0.3s ease;
  background-color: #FFFFFF; /* White background */
  box-shadow: 0 0 10px rgba(49, 130, 206, 0.2);
  
  &:hover {
    background-color: #3182CE;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 0 15px rgba(49, 130, 206, 0.4);
  }
`;

const FeaturedEventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CallToAction = styled.section`
  padding: 6rem 2rem;
  background-color: #1A365D; /* Darker blue for contrast with white site */
  color: white;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1541532713592-79a0317b6b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80');
    background-size: cover;
    background-position: center;
    opacity: 0.1;
    z-index: 1;
  }
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--color-secondary);
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: var(--color-secondary-dark);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-secondary);
`;

const StatLabel = styled.div`
  font-size: 1.125rem;
  opacity: 0.8;
`;

const HomePage = () => {
  const { events, loading, error } = useEvents();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Get the 3 most recent events
  const featuredEvents = events.slice(0, 3);
  
  // Cities with images - hardcoded locally
  const cities = [
    { name: "Nairobi", image: "/images/nairobi.jpg" },
    { name: "Mombasa", image: "/images/mombasa.jpg" },
    { name: "Kisumu", image: "/images/kisumu.jpg" },
    { name: "Nakuru", image: "/images/nakuru.jpg" },
    { name: "Eldoret", image: "/images/eldoret.jpg" }
  ];
  
  return (
    <>
      <Hero>
        <HeroContent>
          <HeroTitle>
            Discover <span>Amazing Events</span> Happening in Kenya
          </HeroTitle>
          <HeroSubtitle>
            Find the best local events in Nairobi, Mombasa, and other cities across Kenya.
            From tech meetups to cultural festivals, we've got you covered.
          </HeroSubtitle>
          
          <SearchBar>
            <SearchInput placeholder="Search for events, venues, or categories..." />
            <SearchButton 
              to="/events" 
            >
              <span>Find Events</span>
              <span>→</span>
            </SearchButton>
          </SearchBar>
          
          <PopularTags className="tag-container">
            <TagLink to="/events" className="event-tag">All Events</TagLink>
            <TagLink 
              to="/events?category=Technology" 
              className="event-tag"
              onClick={() => localStorage.setItem('selectedCategory', 'Technology')}
            >Tech</TagLink>
            <TagLink 
              to="/events?category=Music" 
              className="event-tag"
              onClick={() => localStorage.setItem('selectedCategory', 'Music')}
            >Music</TagLink>
            <TagLink 
              to="/events?category=Arts" 
              className="event-tag"
              onClick={() => localStorage.setItem('selectedCategory', 'Arts')}
            >Arts</TagLink>
            <TagLink 
              to="/events?category=Business" 
              className="event-tag"
              onClick={() => localStorage.setItem('selectedCategory', 'Business')}
            >Business</TagLink>
            <TagLink 
              to="/events?category=Food" 
              className="event-tag"
              onClick={() => localStorage.setItem('selectedCategory', 'Food')}
            >Food</TagLink>
            <TagLink 
              to="/events?category=Sports" 
              className="event-tag"
              onClick={() => localStorage.setItem('selectedCategory', 'Sports')}
            >Sports</TagLink>
            <TagLink 
              to="/events?category=Entertainment" 
              className="event-tag"
              onClick={() => localStorage.setItem('selectedCategory', 'Entertainment')}
            >Entertainment</TagLink>
            <TagLink 
              to="/events?category=Education" 
              className="event-tag"
              onClick={() => localStorage.setItem('selectedCategory', 'Education')}
            >Education</TagLink>
            <TagLink 
              to="/events?category=Health" 
              className="event-tag"
              onClick={() => localStorage.setItem('selectedCategory', 'Health')}
            >Health</TagLink>
            <TagLink 
              to="/events?category=Community" 
              className="event-tag"
              onClick={() => localStorage.setItem('selectedCategory', 'Community')}
            >Community</TagLink>
          </PopularTags>
        </HeroContent>
      </Hero>
      
      <Section>
        <SectionHeader>
          <SectionTitle>Why Choose <span>EventKenya</span>?</SectionTitle>
          <SectionSubtitle>
            Our platform makes it easy to discover and keep track of all the amazing events happening around you.
          </SectionSubtitle>
        </SectionHeader>
        
        <FeatureGrid>
          <FeatureCard className="fade-in">
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>Easy Discovery</FeatureTitle>
            <FeatureDescription>
              Powerful search and filtering to find exactly what you're looking for, whether it's tech meetups, art exhibitions, or music festivals.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard className="fade-in" style={{ animationDelay: '0.2s' }}>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>Always Up-to-Date</FeatureTitle>
            <FeatureDescription>
              Our platform is regularly updated with the latest events happening across Kenya, so you never miss out on what's happening.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard className="fade-in" style={{ animationDelay: '0.4s' }}>
            <FeatureIcon>🌍</FeatureIcon>
            <FeatureTitle>Local Focus</FeatureTitle>
            <FeatureDescription>
              Specifically designed for events in Kenyan cities, making local discovery easier and helping you connect with your community.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </Section>
      
      <CitiesSection>
        <SectionHeader>
          <SectionTitle>Explore Events by <span>City</span></SectionTitle>
          <SectionSubtitle>
            Discover what's happening in these popular Kenyan cities
          </SectionSubtitle>
        </SectionHeader>
        
        <CitiesGrid>
          {cities.map((city, index) => (
            <CityCard 
              key={index}
              to={`/events?city=${city.name}`}
              className="slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                console.log(`Clicked on ${city.name}`);
                localStorage.setItem('selectedCity', city.name);
              }}
            >
              <CityImage src={city.image} alt={city.name} />
              <CityOverlay />
              <CityName>{city.name}</CityName>
            </CityCard>
          ))}
        </CitiesGrid>
      </CitiesSection>
      
      <FeaturedEventsSection>
        <FeaturedEventsHeader>
          <FeaturedEventsTitle>
            <SectionTitle>Featured <span>Events</span></SectionTitle>
            <SectionSubtitle>
              Check out some of the exciting events happening soon in Kenya
            </SectionSubtitle>
          </FeaturedEventsTitle>
          
          <ViewAllLink to="/events">
            <span>View All Events</span>
            <span>→</span>
          </ViewAllLink>
        </FeaturedEventsHeader>
        
        {loading ? (
          <Loading message="Loading featured events..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <FeaturedEventsGrid>
            {featuredEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                featured={index === 0}
              />
            ))}
          </FeaturedEventsGrid>
        )}
      </FeaturedEventsSection>
      
      <CallToAction>
        <CTAContent>
          <CTATitle>Ready to discover amazing events?</CTATitle>
          <CTAText>
            Join thousands of Kenyans finding and attending events that match their interests.
          </CTAText>
          <CTAButton to="/events">
            <span>Start Exploring</span>
            <span>→</span>
          </CTAButton>
          
          <StatsContainer>
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Events</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>50k+</StatNumber>
              <StatLabel>Users</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>5</StatNumber>
              <StatLabel>Major Cities</StatLabel>
            </StatItem>
          </StatsContainer>
        </CTAContent>
      </CallToAction>
    </>
  );
};

export default HomePage;