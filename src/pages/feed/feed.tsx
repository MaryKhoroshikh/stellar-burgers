import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders, selectFeed } from '../../services/slices/ordersList';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
