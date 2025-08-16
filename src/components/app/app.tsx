import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect, useRef } from 'react';
import { fetchIngredients } from '../../slices/appSlice';
import { getUserInfo, refreshTokenUser } from '../../slices/user/userActions';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { resetOrder } from '../../slices/order';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isModal = location.state as { background?: Location };
  const dataFetch = useRef(false);
  useEffect(() => {
    if (dataFetch.current) return;
    dataFetch.current = true;
    const fetchUserInfo = async () => {
      const result = await dispatch(getUserInfo());
      if (getUserInfo.rejected.match(result)) {
        const ref = localStorage.getItem('refreshToken');
        if (ref) {
          await dispatch(refreshTokenUser());
          await dispatch(getUserInfo());
        }
      }
    };
    dispatch(fetchIngredients());
    fetchUserInfo();
  }, [dispatch]);

  const handleModalClose = () => {
    dispatch(resetOrder());
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={isModal?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile'>
          <Route index element={<OnlyAuth component={<Profile />} />} />
          <Route
            path='orders'
            element={<OnlyAuth component={<ProfileOrders />} />}
          />
          <Route
            path='orders/:number'
            element={<OnlyAuth component={<OrderInfo />} />}
          />
        </Route>
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {isModal?.background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {isModal?.background && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
      {isModal?.background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
