import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';

const App = () => {
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
      <Routes>
        <Route path='/feed/:number' element={<Modal title='' onClose={()=>undefined}><OrderInfo></OrderInfo></Modal>}></Route>
        <Route path='/ingredients/:id' element={<Modal title='' onClose={()=>undefined}><IngredientDetails></IngredientDetails></Modal>}></Route>
        <Route path='/profile/orders/:number' element={<ProtectedRoute><Modal title='' onClose={()=>undefined}><OrderInfo></OrderInfo></Modal></ProtectedRoute>}></Route>
      </Routes>
      </div>
    </BrowserRouter> 
    
  )
};

export default App;
