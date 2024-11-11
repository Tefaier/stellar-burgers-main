import { FC, useEffect, useMemo, useState } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeedsApi, getOrdersApi } from '@api';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора (а надо ли, сейчас новые запросы постоянно) */
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [feed, setFeed] = useState({});

  useEffect(() => {
    const promise1 = getOrdersApi().then(result => setOrders(result));
    const promise2 = getFeedsApi().then(result => setFeed(result));
    return () => {
      Promise.reject(promise1);
      Promise.reject(promise2);
    };
  }, [])

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
