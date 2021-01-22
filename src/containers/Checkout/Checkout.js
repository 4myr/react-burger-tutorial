import React, { Component } from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0
    };
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price')
                price = +param[1]
            else
                ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }
    purchaseHandler = () => {
        this.props.history.push({
            pathname: this.props.match.path + '/contact-data'
        })
    }
    cancelHandler = () => {
        this.props.history.goBack();
    };
    render() {
        return (
            <CheckoutSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} cancelClick={ this.cancelHandler } purchaseClick={ this.purchaseHandler } />
        );
    }
}

export default Checkout;