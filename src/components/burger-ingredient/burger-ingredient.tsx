import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

import { useDispatch } from '../../services/store';
import { openIngredient } from '../../services/slices/ingredients';
import { TIngredient } from '@utils-types';
import { addIngredient } from '../../services/slices/consrtuctorB';
import { nanoid } from '@reduxjs/toolkit';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();

    const dispatch = useDispatch();
    const handleAdd = () => {
      dispatch(addIngredient({ ...ingredient, id: nanoid() }));
    };
    const handleOpenIngredient = (ingredient: TIngredient) => {
      dispatch(openIngredient(ingredient));
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
