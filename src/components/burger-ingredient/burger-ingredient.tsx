import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

import { useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';
import { burgerActions, ingredientsActions } from '@slices';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();

    const dispatch = useDispatch();
    const handleAdd = () => {
      dispatch(burgerActions.addIngredient({ ...ingredient, id: nanoid() }));
    };
    const handleOpenIngredient = (ingredient: TIngredient) => {
      dispatch(ingredientsActions.openIngredient(ingredient));
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
