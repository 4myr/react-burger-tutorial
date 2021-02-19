import React from 'react';
import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const addIngredient = (item) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        item: item
    }
}

export const removeIngredient = (item) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        item: item
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger2-c5eb5-default-rtdb.firebaseio.com/ingredients.json').then(res => {
            dispatch(setIngredients(res.data));
        }).catch(err => {
            dispatch(fetchIngredientsFail(err));
        });
    }
}

export const setIngredients = (ings) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ings: ings
    }
}

export const fetchIngredientsFail = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL,
        error: error
    }
}