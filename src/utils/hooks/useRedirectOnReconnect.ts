import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useRedirectOnReconnect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnline = navigator.onLine;

  useEffect(() => {
    const handleOnline = () => {
      const returnPath = (location.state as { from?: string })?.from || '/';
      navigate(returnPath);
    };

    if (isOnline) {
      const returnPath = (location.state as { from?: string })?.from || '/';
      navigate(returnPath);
    } else {
      window.addEventListener('online', handleOnline);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [isOnline, navigate, location]);

  return isOnline;
};

export default useRedirectOnReconnect;
