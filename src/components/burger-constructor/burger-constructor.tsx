import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import {
  burgerSelectors,
  orderAction,
  orderSelectors,
  profileSelectors
} from '@slices';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { getCookie } from '../../utils/cookie';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorBun = useSelector(burgerSelectors.selectBun);
  const constructorIngredients = useSelector(burgerSelectors.selectIngredients);
  const orderRequest = useSelector(orderSelectors.selectNewOrderRequest);
  const orderModalData = useSelector(orderSelectors.selectNewOrderModalData);
  const user = useSelector(profileSelectors.selectUser);

  const getIngredientsIds = () => {
    const arr = constructorIngredients.map((item) => item._id);
    arr.push(constructorBun._id);
    arr.unshift(constructorBun._id);
    return arr;
  };

  const onOrderClick = () => {
    if (!constructorBun || orderRequest) return;
    if (!getCookie('accessToken')) {
      navigate('/login');
    } else {
      dispatch(orderAction.fetchOrder(getIngredientsIds()));
    }
  };

  const closeOrderModal = () => {
    dispatch(orderAction.closeModal());
  };

  const price = useMemo(
    () =>
      (constructorBun ? constructorBun.price * 2 : 0) +
      constructorIngredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorBun, constructorIngredients]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{
        bun: constructorBun,
        ingredients: constructorIngredients
      }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      data-cy='order-button'
    />
  );
};
