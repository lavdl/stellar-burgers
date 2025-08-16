import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, resetOrder } from '../../slices/order';
import { clearConstructor } from '../../slices/constructorSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const constructorItems = useSelector((state) => state.burderConstructor);
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const { orderRequest, orderModalData } = useSelector((state) => state.order);

  const onOrderClick = () => {
    if (!isAuthorized) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];
    dispatch(createOrder(orderData));
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
