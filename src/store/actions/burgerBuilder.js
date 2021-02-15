import React from 'react';
import * as actionTypes from '../actions/actionTypes';

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