import React from 'react';
import App from '../../../../App';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}: </div>
        <button
            disabled={props.disabled}
            onClick={props.removed}
            className={classes.Less}>کم کردن</button>
        <button
         onClick={props.added}
         className={classes.More}>افزودن</button>
    </div>
);

export default buildControl;