import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { updateFeedsThunk } from '../../services/orderSlice';
import { selectFeeds, selectIsInitialized } from '../../services/selectors';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const { orders } = useSelector(selectFeeds);
  const dispatch = useDispatch();

  if (!useSelector(selectIsInitialized)) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(updateFeedsThunk());
      }}
    />
  );
};
