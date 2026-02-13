import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const account = useSelector((state: RootState) => state.auth.auth);
  const location = useLocation();

  const blockedRoutes = ['/account', '/login', '/signup'];

  if (!account && blockedRoutes.includes(location.pathname)) {
    return null;
  }

  return <>{children}</>;
};
