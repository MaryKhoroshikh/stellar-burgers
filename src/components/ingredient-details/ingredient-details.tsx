import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import {
  ingredientsActions,
  ingredientsSelectors
} from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const ingredientData = useSelector(ingredientsSelectors.selectIngredientData);
  const ingreds = useSelector(ingredientsSelectors.selectIngredients);
  const params = useParams() || '';
  const ingredientId = params.id;

  useEffect(() => {
    if (!ingredientData && ingredientId) {
      dispatch(ingredientsActions.openIngredient(ingredientId));
      console.log(ingredientId);
    }
  }, [dispatch, ingreds, ingredientId, ingredientData]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
