import { profileSelectors } from '@slices';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
  isPrivate?: boolean;
};

function ProtectedRoute({ children, isPrivate }: ProtectedRouteProps) {
  const user = useSelector(profileSelectors.selectUser).name;
  const checkProfile = useSelector(profileSelectors.profileCheck);
  const requestStatus = useSelector(profileSelectors.selectRequestStatus);
  const location = useLocation();

  if (!checkProfile || requestStatus === 'load') {
    return <Preloader />;
  }

  if (!isPrivate && user !== '') {
    const from = location.state?.from || { pathname: '/' };
    return (
      <Navigate to={from} state={{ background: from?.state?.background }} />
    );
  }

  if (isPrivate && user === '') {
    return (
      <Navigate
        to='/login'
        state={{
          from: location
        }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;
