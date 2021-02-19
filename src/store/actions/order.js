import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import order from '../../components/Order/Order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}
export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}
export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerInit())
        axios.post('/orders.json', orderData).then(resp => {
            dispatch(purchaseBurgerSuccess(resp.data.name, orderData));
        }).catch(error => {
            dispatch(purchaseBurgerFail(error));
        })
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const fetchOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    }
}
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}
export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}
export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        const params = "?orderBy=\"userId\"&equalTo=\"" + localStorage.getItem('userId') + "\""
        axios.get('/orders.json' + params).then(resp => {
            const fetchedOrders = [];
            for (let i in resp.data) {
                fetchedOrders.push({
                    id: i,
                    ...resp.data[i]
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err => {
            dispatch(fetchOrdersFail(err))
        });
    }
}