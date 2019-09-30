import { ADD_INGREDIENTS, REMOVE_INGREDIENT, SET_INGREDIENT, FEATCH_INGREDIENT_FAILED } from '../actionTypes';

const intialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 15,
    error: false,
}

const ingredientPrice = {
    salad: 5,
    bacon: 10,
    cheese: 15,
    meat: 20 
}

const burgerBuilder = ( state= intialState, action ) => {
    switch(action.type) {
        case ADD_INGREDIENTS : 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice+ingredientPrice[action.ingredientName],
            }  
        case REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice-ingredientPrice[action.ingredientName],
            }
        case  SET_INGREDIENT : 
            return {
                ...state,
                ingredients: action.ingredients
            }
        case  FEATCH_INGREDIENT_FAILED : 
            return {
                ...state,
                error: true
            }
        default : return state;
    }
}

export default burgerBuilder;