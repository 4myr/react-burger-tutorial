import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {props.translate_ingredient[igKey]}
                    </span>
                    : {props.ingredients[igKey]}
                </li>
            );
        });
    return (
        <Aux>
            <h3>سفارش شما</h3>
            <p>جزییات سفارش شما به شرح زیر می باشد:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p style={{fontWeight: "bold"}}>قیمت کل: {props.price.toFixed(2)}</p>
            <p>آیا قصد ادامه خرید را دارید؟</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>لغو</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>خرید</Button>
        </Aux>
    );
};

export default React.memo(orderSummary);