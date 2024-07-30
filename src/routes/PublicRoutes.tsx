import { Route, Routes } from 'react-router-dom';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';
import TermsCondition from '../pages/legal/TermsConditions';
import PublicLayout from '../components/layout/PublicLayout';

export default function PublicRoutes() {
  return (
    <Routes>
    <Route path="/" element={<PublicLayout />}>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
      <Route path="/terms-condition" element={<TermsCondition/>} />
    </Route>
  </Routes>
  )
}
