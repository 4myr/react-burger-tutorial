import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let createdInput;
    const className = [];
    if (props.invalid)
        className.push(classes.Invalid);

    switch (props.inputtype) {
        case 'input':
            className.push(classes.Input);
            createdInput = <input className={className.join(' ')} name={props.name} {...props.config} onChange={props.changeHandler} />
            break;
        case 'textarea':
            className.push(classes.Textarea);
            createdInput = <textarea className={className.join(' ')} name={props.name} {...props} onChange={props.changeHandler}></textarea>
            break;
        case 'dropdown':
            className.push(classes.Dropdown);
            let options = [];
            props.config.options.map(item => {
                options.push(<option value={item.value}>{item.displayValue}</option>);
            });
            createdInput = 
            <select id={props.name} className={className.join(' ')} name={props.name} onChange={props.changeHandler} >
                {options}
            </select>
            break;
        default:
            className.push(classes.Input);
            createdInput = <input className={className.join(' ')} name={props.name} {...props.config}  onChange={props.changeHandler} />
            break;
    }

    return (
        <div className={classes.DivInput}>
            <label className={classes.Label} htmlFor={props.name}>{props.config.label}</label>
            {createdInput}
        </div>
    )
}

export default input;