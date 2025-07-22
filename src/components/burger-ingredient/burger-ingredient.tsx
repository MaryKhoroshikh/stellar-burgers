import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';
import { burgerActions } from '../../services/slices/burgerSlice';
import { ingredientsActions } from '../../services/slices/ingredientsSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();

    const dispatch = useDispatch();
    const handleAdd = () => {
      dispatch(burgerActions.addIngredient({ ...ingredient, id: nanoid() }));
    };
    const handleOpenIngredient = (ingredient: TIngredient) => {
      dispatch(ingredientsActions.openIngredient(ingredient._id));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
        handleOpenIngredient={handleOpenIngredient}
      />
    );
  }
);
