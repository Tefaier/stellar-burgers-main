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
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useParams
} from 'react-router-dom';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  updateFeedsThunk,
  updateIngredientsThunk,
  updateUserOrdersThunk
} from '../../services/orderSlice';
import { selectUser } from '@selectors';
import { getCookie } from '../../utils/cookie';
import { getUserThunk } from '../../services/rootSlice';

const App = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const match1 = useMatch('/feed/:number');
  const match2 = useMatch('/ingredients/:id');
  const match3 = useMatch('/profile/orders/:number');
  const modalOnClose = () => {
    navigate(state?.background || '/');
  };

  useEffect(() => {
    dispatch(updateIngredientsThunk());
    dispatch(updateFeedsThunk());
    dispatch(getUserThunk());
  }, []);

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(updateUserOrdersThunk());
    }
  }, [user]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' />
        <Route path='/ingredients/:id' />
        <Route path='/profile/orders/:number' />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      {state?.background ? (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={'Заказ номер ' + match1?.params.number}
                onClose={modalOnClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Ингредиент номер ' + match2?.params.id}
                onClose={modalOnClose}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={'Заказ номер ' + match3?.params.number}
                  onClose={modalOnClose}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
