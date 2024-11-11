import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { forgotPasswordApi, getFeedsApi, getOrdersApi, getUserApi, loginUserApi, logoutApi, orderBurgerApi, registerUserApi, resetPasswordApi, TRegisterData, updateUserApi } from '../utils/burger-api';
import { TConstructorIngredient, TOrder, TOrdersData, TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from 'src/utils/cookie';


// make order
export const orderBurgerThunk = createAsyncThunk(
    'orders/orderBurger',
    (data: string[]) => orderBurgerApi(data)
)


export interface orderState {
    constructorItems: TConstructorIngredient[],
    orderRequest: boolean,
    orderModalData: TOrder | null
}

const initialState: orderState = {
    constructorItems: [],
    orderRequest: false,
    orderModalData: null
}

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addConstructorItem: (state: orderState, action: PayloadAction<TConstructorIngredient>) => {
            state.constructorItems = state.constructorItems.concat(action.payload);
        },
        removeConstructorItem: (state: orderState, action: PayloadAction<TConstructorIngredient>) => {
            state.constructorItems = state.constructorItems.filter(item => item._id != action.payload._id);
        },
        clearOrderData: (state: orderState) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(orderBurgerThunk.pending, (state: orderState) => {
            state.orderRequest = true;
        });
        builder.addCase(orderBurgerThunk.rejected, (state: orderState) => {
            state.orderRequest = false;
        });
        builder.addCase(orderBurgerThunk.fulfilled, (state: orderState, {payload}) => {
            state.orderRequest = false;
            state.orderModalData = payload.order;
        });
    },
    selectors: {
        selectIsOrderInProgress: (state: orderState) => {
            return state.orderRequest;
        },
        selectOrderResponse: (state: orderState) => {
            return state.orderModalData;
        },
        selectIngredients: (state: orderState) => {
            return state.constructorItems;
        }
    }
});

export const { addConstructorItem, removeConstructorItem, clearOrderData } = orderSlice.actions;
export const { selectIsOrderInProgress, selectOrderResponse, selectIngredients } = orderSlice.selectors;
export default orderSlice.reducer
