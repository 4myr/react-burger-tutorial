import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialStore = {
    loading: false,
    error: null,
    purchased: false,
    orders: null
};

const purchaseBurgerInit = (state) => updateObject(state, {loading: true, purchased: false});
const purchaseBurgerSuccess = (state) => updateObject(state, {loading: false, purchased: true});
const purchaseBurgerFail = (state, error) => updateObject(state, {loading: false, error: error});
const fetchOrdersInit = (state) => updateObject(state, {loading: true});
const fetchOrdersSuccess = (state, orders) => updateObject(state, {loading: false, orders: orders});
const fetchOrdersFail = (state, error) => updateObject(state, {loading: false, error: error});

export const orderReducer = (store = initialStore, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_INIT: return purchaseBurgerSuccess(store);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerInit(store);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(store, action.error);
        case actionTypes.FETCH_ORDERS_INIT: return fetchOrdersInit(store);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(store, action.orders);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(store, action.error);
        default: return store;
    }
}
