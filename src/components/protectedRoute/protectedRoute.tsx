import { useSelector } from 'react-redux';
import { selectIsLoading, selectUser } from '../../services/rootSlice';
import { Navigate, useLocation } from 'react-router';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsLoading); 
  const user = useSelector(selectUser); 
  const location = useLocation();

  if (!onlyUnAuth && !user) { 
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) { 
    return <Navigate replace to="/list" />;
  }

    return children ;
}
