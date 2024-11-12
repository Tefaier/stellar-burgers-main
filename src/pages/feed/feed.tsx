import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectFeeds, selectIsInitialized } from 'src/services/orderSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeeds);

  if (!useSelector(selectIsInitialized)) {
    return <Preloader />;
  }

  return (<FeedUI orders={orders} handleGetFeeds={() => {}} />);
};
