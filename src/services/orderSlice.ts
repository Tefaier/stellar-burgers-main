import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { forgotPasswordApi, getFeedsApi, getIngredientsApi, getOrdersApi, getUserApi, loginUserApi, logoutApi, orderBurgerApi, registerUserApi, resetPasswordApi, TRegisterData, updateUserApi } from '../utils/burger-api';
import { TConstructorIngredient, TIngredient, TOrder, TOrdersData, TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from 'src/utils/cookie';


// make order
export const orderBurgerThunk = createAsyncThunk(
    'orders/orderBurger',
    (data: string[]) => orderBurgerApi(data)
)

export const updateIngredientsThunk = createAsyncThunk(
    'orders/updateIngredients',
    () => getIngredientsApi()
)

export const updateFeedsThunk = createAsyncThunk(
    'orders/updateFeeds',
    () => getFeedsApi()
)

export const updateUserOrdersThunk = createAsyncThunk(
    'orders/updateUserOrders',
    () => getOrdersApi()
)

export interface orderState {
    constructorItems: TConstructorIngredient[],
    orderRequest: boolean,
    orderModalData: TOrder | null,
    allIngredients: TIngredient[] | null,
    allFeeds: {orders: TOrder[], total: number, totalToday: number} | null,
    allUserOrders: TOrder[] | null,
    initialized: boolean
}

const initialState: orderState = {
    constructorItems: [],
    orderRequest: false,
    orderModalData: null,
    allIngredients: null,
    allFeeds: null,
    allUserOrders: null,
    initialized: false
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
            state.constructorItems = [];
        });
        builder.addCase(updateIngredientsThunk.fulfilled, (state: orderState, {payload}) => {
            state.allIngredients = payload;
            state.initialized = state.allFeeds !== null && state.allIngredients !== null;
        });
        builder.addCase(updateFeedsThunk.fulfilled, (state: orderState, {payload}) => {
            state.allFeeds = payload;
            state.initialized = state.allFeeds !== null && state.allIngredients !== null;
        });
        builder.addCase(updateUserOrdersThunk.fulfilled, (state: orderState, {payload}) => {
            state.allUserOrders = payload;
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
        },
        selectAllIngredients: (state: orderState) => {
            return state.allIngredients || [];
        },
        selectFeeds: (state: orderState) => {
            return state.allFeeds || {orders: [], total: 0, totalToday: 0};
        },
        selectUserOrders: (state: orderState) => {
            return state.allUserOrders || [];
        },
        selectIsInitialized: (state: orderState) => {
            return state.initialized;
        },
    }
});

export const { addConstructorItem, removeConstructorItem, clearOrderData } = orderSlice.actions;
export const { selectIsOrderInProgress, selectOrderResponse, selectIngredients, selectAllIngredients, selectFeeds, selectUserOrders, selectIsInitialized } = orderSlice.selectors;
export default orderSlice.reducer
