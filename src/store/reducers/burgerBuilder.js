import * as actionTypes from '../actions/actionTypes'; 
const initialStore = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0,
  }


export const burgerBuilderReducer = (store = initialStore, action) => {
    const INGREDIENT_PRICES = {
        salad: 0.5,
        cheese: 0.4,
        meat: 1.3,
        bacon: 0.7
    }
    
    switch (action.type) {
        case(actionTypes.ADD_INGREDIENT):
            const addIngredients = {
                ...store.ingredients,
            }
            addIngredients[action.item] = addIngredients[action.item] + 1
            return {
                ...store,
                ingredients: addIngredients,
                totalPrice: store.totalPrice + INGREDIENT_PRICES[action.item]
            }
        case(actionTypes.REMOVE_INGREDIENT):
            const removeIngredients = {
            ...store.ingredients,
            }
            removeIngredients[action.item] = removeIngredients[action.item] - 1
            return {
            ...store,
            ingredients: removeIngredients,
            totalPrice: store.totalPrice - INGREDIENT_PRICES[action.item]
            }
    }
    return store;
};