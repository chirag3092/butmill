import { ADD_INGREDIENTS, REMOVE_INGREDIENT, SET_INGREDIENT, FEATCH_INGREDIENT_FAILED } from '../actionTypes';
import axios from '../../axios-order';

export const addIngredients = (name) => {
    return {
        type: ADD_INGREDIENTS,
        ingredientName: name,
    }
}

export const removeIngredients = (name) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: name,
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENT,
        ingredients
    }
}

export const fetchIngredientFailed = () => {
    return {
        type: FEATCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://butmill.firebaseio.com/ingredient.json')
        .then(response => {
            dispatch(setIngredients(response.data))    
        })
        .catch(error => {
            dispatch(fetchIngredientFailed())
        })
    }
}