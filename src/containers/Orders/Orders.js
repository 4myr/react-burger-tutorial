import React, { Component, useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import classes from './Orders.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as orderActions from '../../store/actions'

const Orders = props => {
    useEffect(() => {
        props.onFetchOrders();
    }, []);
    let orders = (
        <Spinner />
    )
    
    if (props.error) {
        orders = <p>An Error ocurred</p>;
    }
    else if (!props.isAuthenticated) {
        orders = <Redirect to="/" />
    }
    else if (props.orders) {
        orders = props.orders.map(v => {
            console.log(v);
            return <Order key={v.id} ingredients={v.ingredients} price={v.price} />
        });
    }

    return (
        <div className={classes.Orders}>
            { orders }
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        isAuthenticated: state.auth.isAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(orderActions.fetchOrders())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);