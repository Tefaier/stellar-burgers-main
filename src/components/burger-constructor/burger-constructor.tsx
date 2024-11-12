import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { clearOrderData, orderBurgerThunk, selectIngredients, selectIsOrderInProgress, selectOrderResponse } from 'src/services/orderSlice';
import { useDispatch } from 'src/services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const ingreadients = useSelector(selectIngredients);
  const constructorItems = {
    bun: ingreadients.find(ing => ing.type == 'bun'),
    ingredients: ingreadients.filter(ing => ing.type != 'bun')
  };
  const dispatch = useDispatch();
  const orderRequest = useSelector(selectIsOrderInProgress);

  const orderModalData = useSelector(selectOrderResponse);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    /** TODO: понять что сюда пихать */
    dispatch(orderBurgerThunk(constructorItems.ingredients.map(ing => ing._id)));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderData());
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

  return null;

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
