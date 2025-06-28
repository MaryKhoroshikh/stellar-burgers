import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectConstructorItems } from '../../services/slices/consrtuctorB';
import {
  selectOrderRequest,
  selectOrderModalData
} from '../../services/slices/order';
import { orderAction, profileSelectors } from '@slices';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const user = useSelector(profileSelectors.selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getIngredientsIds = () => {
    const arr = constructorItems.ingredients.map((item) => item._id);
    arr.push(constructorItems.bun._id);
    return arr;
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user.name === '') {
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
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

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
