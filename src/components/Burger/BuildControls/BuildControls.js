import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'سالاد', type: 'salad' },
    { label: 'بیکن', type: 'bacon' },
    { label: 'پنیر', type: 'cheese' },
    { label: 'گوشت', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p className={classes.CurrentPrice}>
            <strong>قیمت محاسبه شده: {props.price.toFixed(2)}</strong>
        </p>
        {
            controls.map(ctrl => (
                <BuildControl
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                    key={ctrl.label} label={ctrl.label} />
            ))
        }
        <button
            disabled={!props.purchasable}
            onClick={props.ordered}
            className={classes.OrderButton}>خرید</button>
    </div>
);
export default buildControls;