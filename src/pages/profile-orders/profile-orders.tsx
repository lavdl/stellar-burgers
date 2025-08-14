import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchGetOrders } from '../../slices/order';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.loading);
  const orders: TOrder[] = useSelector((state) => state.order.data);
  useEffect(() => {
    dispatch(fetchGetOrders());
  }, [dispatch]);
  return loading ? <Preloader /> : <ProfileOrdersUI orders={orders} />;
};
