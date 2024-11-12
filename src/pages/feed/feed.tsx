import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectFeeds, selectIsInitialized, updateFeedsThunk } from 'src/services/orderSlice';
import { useDispatch } from 'src/services/store';

export const Feed: FC = () => {
  const {orders} = useSelector(selectFeeds);
  const dispatch = useDispatch();

  if (!useSelector(selectIsInitialized)) {
    return <Preloader />;
  }

  return (<FeedUI orders={orders} handleGetFeeds={() => { dispatch(updateFeedsThunk()); }} />);
};
