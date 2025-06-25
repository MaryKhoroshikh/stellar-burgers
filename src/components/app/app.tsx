import { ConstructorPage } from '../../pages/constructor-page/constructor-page';
import { Feed } from '../../pages/feed';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { ProfileOrders } from '../../pages/profile-orders';
import { NotFound404 } from '../../pages/not-fount-404';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { AppHeader } from '@components';
import { Modal } from '@components';
import { OrderInfo } from '@components';
import { IngredientDetails } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredients';
import { fetchFeed } from '../../services/slices/ordersList';

function AppRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchFeed());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />}>
          <Route
            path=':number'
            element={
              <Modal title='' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингридиента' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />}>
          <Route path='orders' element={<ProfileOrders />}>
            <Route
              path=':number'
              element={
                <Modal title='' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </>
  );
}

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <AppRouter />
  </div>
);

export default App;
