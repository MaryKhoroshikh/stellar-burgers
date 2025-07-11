import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { profileActions, profileSelectors } from '@slices';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isRequestLoading = useSelector(profileSelectors.selectRequestStatus);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData = { email: email, password: password, name: '' };
    dispatch(profileActions.loginUser(userData));
  };

  if (isRequestLoading === 'load') {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
