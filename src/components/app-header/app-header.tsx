import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { profileSelectors } from '@slices';

export const AppHeader: FC = () => {
  const user = useSelector(profileSelectors.selectUser);

  return <AppHeaderUI userName={user.name} />;
};
