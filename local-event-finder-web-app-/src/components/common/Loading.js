import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  min-height: 150px;
`;

const Spinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 3px solid #D1410C; /* Eventbrite orange */
  width: 35px;
  height: 35px;
  animation: ${spin} 0.8s linear infinite;
  margin-bottom: 0.75rem;
`;

const LoadingText = styled.p`
  font-weight: 500;
  color: #666;
  font-size: 0.9rem;
`;

const Loading = ({ message = "Loading..." }) => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;