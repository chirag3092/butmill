import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START, FETCH_ORDER_START, FETCH_ORDER_SUCCESS, FETCH_ORDER_FAIL } from '../actionTypes';

const initialState = {
    orders: [],
    loading: false,
}

const order = (state = initialState, action) => {
    switch(action.type) {
        case PURCHASE_BURGER_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case PURCHASE_BURGER_SUCCESS: {
            return {
                ...state,
                orders: state.orders.concat(action.orderData),
            }
        }
        case PURCHASE_BURGER_FAIL: {
            return {
                ...state,
                loading: false,
            }
        }
        case FETCH_ORDER_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case FETCH_ORDER_SUCCESS: {
            return {
                ...state,
                orders: action.orders,
            }
        }
        case FETCH_ORDER_FAIL: {
            return {
                ...state,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default order