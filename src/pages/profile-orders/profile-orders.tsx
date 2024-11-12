import { getOrdersApi } from '@api';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserOrders } from 'src/services/orderSlice';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
