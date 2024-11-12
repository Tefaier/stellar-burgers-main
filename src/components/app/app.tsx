import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { useEffect } from 'react';
import { useDispatch } from 'src/services/store';
import { updateFeedsThunk, updateIngredientsThunk, updateUserOrdersThunk } from 'src/services/orderSlice';

const App = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const pathParams = useParams();
  const dispatch = useDispatch();
  const modalOnClose = () => {
    navigate(state.modalBackgrund);
  };

  useEffect(() => {
    dispatch(updateIngredientsThunk());
    dispatch(updateFeedsThunk());
    dispatch(updateUserOrdersThunk());
  }, []);

  return (
    <BrowserRouter >
      <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />}></Route>
        <Route path='/' element={<ConstructorPage />}></Route>
        <Route path='/feed' element={<Feed />}></Route>
        <Route path='/login' element={<ProtectedRoute><Login /></ProtectedRoute>}></Route>
        <Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>}></Route>
        <Route path='/reset-password' element={<ProtectedRoute><ResetPassword /></ProtectedRoute>}></Route>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        <Route path='/profile/orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>}></Route>
      </Routes>
      { state.modalBackgrund ? 
        <Routes>
          <Route path='/feed/:number' element={<Modal title={'Заказ номер ' + pathParams["number"]} onClose={modalOnClose}><OrderInfo></OrderInfo></Modal>}></Route>
          <Route path='/ingredients/:id' element={<Modal title={'Ингредиент номер ' + pathParams["id"]} onClose={modalOnClose}><IngredientDetails></IngredientDetails></Modal>}></Route>
          <Route path='/profile/orders/:number' element={<ProtectedRoute><Modal title={'Заказ номер ' + pathParams["number"]} onClose={modalOnClose}><OrderInfo></OrderInfo></Modal></ProtectedRoute>}></Route>
        </Routes> :
        <Routes>
          <Route path='/feed/:number' element={<OrderInfo></OrderInfo>}></Route>
          <Route path='/ingredients/:id' element={<IngredientDetails></IngredientDetails>}></Route>
          <Route path='/profile/orders/:number' element={<ProtectedRoute><OrderInfo></OrderInfo></ProtectedRoute>}></Route>
        </Routes>  
      }
      </div>
    </BrowserRouter> 
    
  )
};

export default App;
