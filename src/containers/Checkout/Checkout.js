import React, { Component } from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
class Checkout extends Component {
    // state = {
    //     ingredients: {
    //         salad: 0,
    //         bacon: 0,
    //         cheese: 0,
    //         meat: 0
    //     },
    //     totalPrice: 0
    // };
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
            pathname: this.props.match.path + '/contact-data',
            search: this.props.location.search
        })
    }
    cancelHandler = () => {
        this.props.history.goBack();
    };
    render() {
        return (
            <CheckoutSummary ingredients={this.props.ings} totalPrice={this.props.price} cancelClick={ this.cancelHandler } purchaseClick={ this.purchaseHandler } />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);