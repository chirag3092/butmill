import { ADD_INGREDIENTS, REMOVE_INGREDIENT } from './actions';

const intialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 15
}

const ingredientPrice = {
    salad: 5,
    bacon: 10,
    cheese: 15,
    meat: 20 
}

const reducer = ( state= intialState, action ) => {
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
        
        default : return state;
    }
}

export default reducer;