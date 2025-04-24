import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: var(--color-text);
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-primary);
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #082a3f;
  }
`;

const NotFoundPage = () => {
  return (
    <Container className="max-w-6xl mx-auto px-8 py-16 text-center">
      <ErrorCode className="text-8xl font-bold text-secondary mb-4">404</ErrorCode>
      <Title className="text-3xl font-semibold text-primary mb-6">Page Not Found</Title>
      <Description className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Description>
      <HomeButton to="/" className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-md hover:bg-primary-dark transition-colors">
        Go to Homepage
      </HomeButton>
    </Container>
  );
};

export default NotFoundPage;