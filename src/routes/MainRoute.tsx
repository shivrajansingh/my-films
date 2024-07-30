import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';
import useNetworkStatus from '../utils/hooks/useNetworkStatus';
import OfflinePage from '../pages/OfflinePage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoutes from './PublicRoutes';

export default function MainRoute() {
  const isOnline = useNetworkStatus();
 
  return (
    <Router>
      <Routes>
      <Route path="/offline" element={<OfflinePage />} />
      <Route element={<ProtectedRoute isOnline={isOnline} />}>
        <Route path="/login/*" element={<AuthRoutes />} />
        <Route path="/p/*" element={<PublicRoutes />} />
        <Route path="/*" element={<AppRoutes />} />
      </Route>
      </Routes>
    </Router>
  );
}
