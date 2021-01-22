import React from 'react';
import classes from './Order.css';

const order = (props) => {
    let ingredients = [];
    for (let i in props.ingredients) {
        ingredients.push(i.charAt(0).toUpperCase() + i.substr(1) + " (" + props.ingredients[i] + ") ")
    }
    return (
        <div className={classes.Order}>
            <h3>
                Ingredients: { ingredients }
            </h3>
            <h3>
                Price: <strong>{props.price}</strong>
            </h3>
        </div>
    );
}

export default order;