import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1A1A1A; /* Very dark gray like Eventbrite */
  color: #FFFFFF;
  padding: 0;
  margin-top: 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, var(--color-secondary) 0%, var(--color-accent) 100%);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem 1.5rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterLogo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  
  span {
    font-size: 2rem;
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FooterAbout = styled.p`
  color: #CCCCCC; /* Light gray like Eventbrite */
  line-height: 1.7;
  margin-bottom: 1.5rem;
  max-width: 350px;
  font-size: 0.95rem;
  font-weight: 400;
  
  @media (max-width: 768px) {
    max-width: none;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #2D2D2D; /* Dark gray like Eventbrite */
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #D1410C; /* Eventbrite orange */
    transform: translateY(-3px);
  }
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;
  
  a {
    color: #CCCCCC; /* Light gray like Eventbrite */
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 400;
    
    &:hover {
      color: #FFFFFF;
      text-decoration: underline;
      
      @media (max-width: 768px) {
        transform: none;
      }
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #CCCCCC; /* Light gray like Eventbrite */
  font-size: 0.95rem;
  font-weight: 400;
  
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #2D2D2D; /* Dark gray background */
    font-size: 1.1rem;
    color: #FFFFFF;
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.875rem;
  color: #CCCCCC; /* Light gray like Eventbrite bottom bar */
  background-color: #0F0F0F; /* Even darker than the main footer */
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 1.5rem 1rem;
  }
`;

const Copyright = styled.p`
  margin: 0;
  color: #CCCCCC; /* Light gray for readability */
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: #CCCCCC; /* Light gray for readability */
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #FFFFFF; /* Full white on hover */
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Newsletter = styled.div`
  margin-bottom: 2rem;
`;

const NewsletterText = styled.p`
  color: #CCCCCC; /* Light gray for readability */
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const SubscribeForm = styled.form`
  display: flex;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const EmailInput = styled.input`
  flex-grow: 1;
  max-width: 220px;
  padding: 0.75rem 1rem;
  border: 1px solid #333333;
  background-color: #2D2D2D; /* Darker input like Eventbrite */
  color: #FFFFFF;
  border-radius: 50px 0 0 50px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #FFFFFF;
    background-color: #333333;
  }
  
  &::placeholder {
    color: #999999;
  }
`;

const SubscribeButton = styled.button`
  background-color: #D1410C; /* Eventbrite's orange color */
  color: white;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0 50px 50px 0;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #F05537; /* Lighter orange on hover */
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterColumn>
            <FooterLogo to="/">
              <span role="img" aria-label="Calendar">🎭</span>
              <span>EventKenya</span>
            </FooterLogo>
            <FooterAbout>
              Your ultimate destination for discovering exciting events happening across Kenya. 
              From tech conferences to cultural festivals, we've got you covered.
            </FooterAbout>
            <SocialLinks>
              <SocialLink href="https://facebook.com" target="_blank" aria-label="Facebook">
                <span>📱</span>
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" aria-label="Twitter">
                <span>📱</span>
              </SocialLink>
              <SocialLink href="https://instagram.com" target="_blank" aria-label="Instagram">
                <span>📱</span>
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <span>📱</span>
              </SocialLink>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Quick Links</ColumnTitle>
            <FooterLinks>
              <FooterLink>
                <Link to="/">Home</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/events">All Events</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/about">About Us</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/events?category=Technology">Tech Events</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/events?city=Nairobi">Events in Nairobi</Link>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Categories</ColumnTitle>
            <FooterLinks>
              <FooterLink>
                <Link to="/events?category=Technology">Technology</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/events?category=Music">Music & Entertainment</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/events?category=Business">Business & Career</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/events?category=Arts & Culture">Arts & Culture</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/events?category=Food & Drink">Food & Drink</Link>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Contact Us</ColumnTitle>
            <ContactItem>
              <span>📍</span>
              <div>Kilimani Business Center, Nairobi, Kenya</div>
            </ContactItem>
            <ContactItem>
              <span>📞</span>
              <div>+254 712 345 678</div>
            </ContactItem>
            <ContactItem>
              <span>📧</span>
              <div>info@eventkenya.co.ke</div>
            </ContactItem>
            
            <Newsletter>
              <ColumnTitle>Newsletter</ColumnTitle>
              <NewsletterText>Subscribe for the latest events and offers</NewsletterText>
              <SubscribeForm>
                <EmailInput 
                  type="email" 
                  placeholder="Your email address" 
                  aria-label="Email address"
                />
                <SubscribeButton type="submit">Subscribe</SubscribeButton>
              </SubscribeForm>
            </Newsletter>
          </FooterColumn>
        </FooterGrid>
      </FooterContent>
      
      <BottomBar>
        <Copyright>
          &copy; {currentYear} EventKenya. All rights reserved.
        </Copyright>
        <LegalLinks>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/site-map">Site Map</Link>
        </LegalLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;