import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { orderAction, orderSelectors } from '../../services/slices/orderSlice';
import { feedSelectors } from '../../services/slices/feedSlice';
import { ingredientsSelectors } from '../../services/slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const number = useParams().number || '';
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData =
    useSelector(feedSelectors.selectOrderModalData) ||
    useSelector(orderSelectors.selectOrderByNumber);
  const ingredients = useSelector(ingredientsSelectors.selectIngredients);

  useEffect(() => {
    if (!orderData) {
      dispatch(orderAction.fetchOrderByNumber(+number));
    }
  }, [dispatch, orderData, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
