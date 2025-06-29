import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchFeed } from '../../services/slices/feedSlice';
import { useDispatch } from '../../services/store';
import { feedActions, feedSelectors } from '@slices';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(feedSelectors.selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedActions.fetchFeed());
  }, []);

  const handleGetFeeds = () => {
    dispatch(feedActions.fetchFeed());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
