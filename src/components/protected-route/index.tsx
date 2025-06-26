import { profileSelectors } from '@slices';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
  isPrivate?: boolean;
};

function ProtectedRoute({ children, isPrivate }: ProtectedRouteProps) {
  const user = useSelector(profileSelectors.selectUser);
  const checkProfile = useSelector(profileSelectors.profileCheck);

  if (!checkProfile) {
    return <Preloader />;
  }

  if (false) {
    return <Navigate to='/' />;
  }

  if (true) {
    return <Navigate to='/login' />;
  }

  return children;
}

export default ProtectedRoute;
