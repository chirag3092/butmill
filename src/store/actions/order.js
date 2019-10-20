import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START, FETCH_ORDER_SUCCESS, FETCH_ORDER_FAIL, FETCH_ORDER_START } from '../actionTypes'; 
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData,
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: PURCHASE_BURGER_FAIL,
        error,
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderData)
            .then(response => {
                window.location.href = '/';
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: FETCH_ORDER_SUCCESS,
        orders,
    }
}

export const fetchOrderFail = error => {
    return {
        type: FETCH_ORDER_FAIL,
        error,
    }
}

export const fetchOrderStart = () => {
    return {
        type: FETCH_ORDER_START
    }
}

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(respone => {
                const fetchOrders=  [];
                const responseData = Object.keys(respone.data);
                responseData.map(key =>(
                    fetchOrders.push({
                        ...respone.data[key],
                        id: key
                    })
                ));
                dispatch(fetchOrderSuccess(fetchOrders));
            })
            .catch(error => {
                dispatch(fetchOrderFail(error))
            })
    }
}