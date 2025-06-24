import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../services/slices/profile';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectOrders);

  return <ProfileOrdersUI orders={orders} />;
};
