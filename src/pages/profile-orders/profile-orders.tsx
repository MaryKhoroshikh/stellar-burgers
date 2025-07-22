import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { profileSelectors } from '../../services/slices/profileSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(profileSelectors.selectOrders);

  return <ProfileOrdersUI orders={orders} />;
};
