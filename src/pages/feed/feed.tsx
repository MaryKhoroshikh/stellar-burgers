import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchFeed } from '../../services/slices/ordersList';
import { useDispatch } from '../../services/store';
import { feedSelectors } from '@slices';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(feedSelectors.selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
