import React from 'react';
import Burger from '../../../components/Burger/Burger';
import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutSummary.css';
import { Route } from 'react-router-dom';
import ContactData from '../ContactData/ContactData';

const checkoutSummary = (props) => {
    return (
        <div className={classes.Summary}>
        <Burger ingredients={props.ingredients} />
        <Button clicked={ props.purchaseClick }btnType="Success">ثبت</Button>
        <Button clicked={ props.cancelClick } btnType="Danger">لغو</Button>

        <Route path="/checkout/contact-data" render={ (props) => (<ContactData {...props} ingredients={props.ingredients} />)} />
        </div>
    );
};

export default checkoutSummary;