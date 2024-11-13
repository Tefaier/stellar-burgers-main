import { FC, useEffect, useMemo, useState } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeedsApi, getOrdersApi } from '@api';
import { useSelector } from '../../services/store';
import { selectFeeds, selectUserOrders } from '../../services/selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feed = useSelector(selectFeeds);

  const readyOrders = getOrders(feed.orders, 'done');

  const pendingOrders = getOrders(feed.orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
