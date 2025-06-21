import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectFeedItems } from '../../services/slices/feed';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectFeedItems);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
