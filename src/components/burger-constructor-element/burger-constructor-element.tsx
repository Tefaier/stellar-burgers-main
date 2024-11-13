import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  moveConstructorItem,
  removeConstructorItem
} from '../../services/orderSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(moveConstructorItem({ up: false, index }));
    };

    const handleMoveUp = () => {
      dispatch(moveConstructorItem({ up: true, index }));
    };

    /** TODO: does it mean delete actually? */
    const handleClose = () => {
      dispatch(removeConstructorItem(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
