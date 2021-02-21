import React, { Component, useEffect } from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
const Checkout = props => {
    // state = {
    //     ingredients: {
    //         salad: 0,
    //         bacon: 0,
    //         cheese: 0,
    //         meat: 0
    //     },
    //     totalPrice: 0
    // };
    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price')
                price = +param[1]
            else
                ingredients[param[0]] = +param[1];
        }
        // this.setState({ingredients: ingredients, totalPrice: price});
    }, []);
    const purchaseHandler = () => {
        props.history.push({
            pathname: props.match.path + '/contact-data',
            search: props.location.search
        })
    }
    const cancelHandler = () => {
        props.history.goBack();
    };
    return (
        <CheckoutSummary ingredients={props.ings} totalPrice={props.price} cancelClick={ cancelHandler } purchaseClick={ purchaseHandler } />
    );
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);