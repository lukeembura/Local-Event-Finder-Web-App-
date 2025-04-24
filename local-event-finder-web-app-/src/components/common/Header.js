import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: white;
  color: #1E0A3C; /* Eventbrite dark purple */
  padding: 0;
  box-shadow: 0 1px 4px rgba(40, 28, 60, 0.1); /* Subtle shadow */
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #EEEDF2; /* Eventbrite subtle border */
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  font-family: 'Inter', sans-serif; /* Eventbrite uses a single font */
  color: #1E0A3C; /* Eventbrite dark purple */
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: -0.01em;
  padding: 0.5rem 0;
  
  span:first-child {
    font-size: 1.75rem;
    color: #D1410C; /* Eventbrite orange */
  }
  
  span:last-child {
    color: #1E0A3C; /* Eventbrite dark purple */
    font-weight: 700;
  }

  &:hover {
    color: #39364F; /* Slightly lighter purple on hover */
    text-decoration: none; /* Eventbrite doesn't use underlines for logo */
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    gap: 1rem;
    border-bottom: 1px solid #E2E8F0;
  }
`;

const NavLink = styled(Link)`
  color: #6F7287; /* Eventbrite medium gray for inactive links */
  text-decoration: none;
  font-weight: 500;
  padding: 1.25rem 0.25rem;
  transition: all 0.2s ease;
  position: relative;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;

  /* Eventbrite doesn't use underlines for main nav, just color change */
  &:after {
    content: none;
  }

  /* Properly color the active link */
  ${props => props.active && `
    color: #1E0A3C; /* Dark purple for active link */
    font-weight: 600;
  `}

  &:hover {
    color: #1E0A3C; /* Dark purple on hover */
  }

  @media (max-width: 768px) {
    display: block;
    padding: 0.75rem 0;
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #1A202C; /* Dark text color for white background */
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const HeaderCTA = styled(Link)`
  background-color: #D1410C; /* Eventbrite orange */
  color: white;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 50px; /* Rounded corners */
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  border: none;
  
  &:hover {
    background-color: #B23709; /* Darker orange */
    color: white;
    text-decoration: none;
  }
  
  span:last-child {
    transition: all 0.2s ease;
  }
  
  &:hover span:last-child {
    transform: translateX(2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <HeaderContainer className="bg-primary text-white">
      <Nav>
        <Logo to="/" className="text-2xl font-bold">
          <span role="img" aria-label="Calendar">🎭</span> 
          <span>EventKenya</span>
        </Logo>
        
        <MobileMenuButton onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
        
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/" active={isActive('/')} className="hover:text-accent">
            Home
          </NavLink>
          <NavLink to="/events" active={isActive('/events')} className="hover:text-accent">
            Events
          </NavLink>
          <NavLink to="/about" active={isActive('/about')} className="hover:text-accent">
            About
          </NavLink>
          <HeaderCTA to="/events" className="bg-secondary hover:bg-secondary-dark">
            <span>Explore Events</span> <span>→</span>
          </HeaderCTA>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;