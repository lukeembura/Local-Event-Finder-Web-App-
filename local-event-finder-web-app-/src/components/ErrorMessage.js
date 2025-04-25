import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #b91c1c;
  border-radius: 0.375rem;
  padding: 1rem;
  margin: 1rem 0;
`;

const ErrorTitle = styled.p`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = ({ title = "Error", message }) => {
  if (!message) return null;
  
  return (
    <ErrorContainer className="bg-red-100 border border-red-500 text-red-700 rounded-md p-4 my-4">
      <ErrorTitle className="font-semibold mb-2">{title}</ErrorTitle>
      <p>{message}</p>
    </ErrorContainer>
  );
};

export default ErrorMessage;