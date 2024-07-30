import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Login from '../pages/auth/Login';

export default function AuthRoutes() {
  return (
    <Routes>
    <Route path="/" element={<AuthLayout />}>
      <Route index element={<Login />} />
    </Route>
  </Routes>
  )
}
