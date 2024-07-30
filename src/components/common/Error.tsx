import React from 'react';

interface ErrorProps {
  title?: string;
  description?: string;
}

const Error: React.FC<ErrorProps> = ({ title, description }) => {
  return (
    <div className="container mt-3">
      <div className="alert alert-danger bg-dark text-light" style={{borderColor : "red"}}>
        {title && <h4 className="alert-heading">{title}</h4>}
        {description && <p className="mb-0">{description}</p>}
      </div>
    </div>
  );
};

export default Error;
