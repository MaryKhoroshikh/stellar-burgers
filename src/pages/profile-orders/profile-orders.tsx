import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { profileActions, profileSelectors } from '@slices';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileActions.fetchUserOrders());
  }, []);
  const orders = useSelector(profileSelectors.selectOrders);

  return <ProfileOrdersUI orders={orders} />;
};
