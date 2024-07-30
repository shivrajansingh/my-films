import React, { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  children: ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => window.scrollTo(0, 0);
    handleScroll();
  }, [location.key]);

  return <>{children}</>;
};

export default ScrollToTop;
