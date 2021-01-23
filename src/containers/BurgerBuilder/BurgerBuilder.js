import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class BurgerBuilder extends Component {
    state = {
        translate_ingredient: {
            salad: 'سالاد',
            bacon: 'بیکن',
            cheese: 'پنیر',
            meat: 'گوشت'
        },
        purchasable: false,
        purchasing: false,
        loading: false
    };

    componentDidMount() {
    }
    updatedPurchaseState() {
        const sum = Object.keys(this.props.ings).map(igKey => {
            return this.props.ings[igKey];
        }).reduce((sum,el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }
    addIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount +1;
        // let updatedIngredient = {
        //     ...this.state.ingredients
        // };
        // updatedIngredient[type] = updatedCount;
        // const priceAddition = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // let newPrice = oldPrice + priceAddition;
        // this.setState({
        //     totalPrice: newPrice,
        //     ingredients: updatedIngredient
        // });
        // this.updatedPurchaseState(updatedIngredient);
    };
    removeIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount - 1;
        // if(updatedCount >= 0) {
        //     const updatedIngredient = {
        //         ...this.state.ingredients
        //     };
        //     updatedIngredient[type] = updatedCount;
        //     const priceAddition = INGREDIENT_PRICES[type];
        //     const oldPrice = this.state.totalPrice;
        //     const newPrice = oldPrice - priceAddition;
        //     this.setState({
        //         totalPrice: newPrice,
        //         ingredients: updatedIngredient
        //     });
        //     this.updatedPurchaseState(updatedIngredient);
        // }
    };
    purchaseHandler = () => {
        this.setState({purchasing: true});
    };
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        const query = [];
        query.push('price=' + encodeURIComponent(this.props.price));
        for (let i in this.props.ings) {
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + query.join('&')
        });
    };
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = <OrderSummary
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.props.price}
                        ingredients={this.props.ings}
                        translate_ingredient={this.state.translate_ingredient} />
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <div>
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatedPurchaseState()}
                        ordered={this.purchaseHandler}
                        />
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (type) => dispatch({type: 'ADD_INGREDIENT', item: type}),
        onRemoveIngredient: (type) => dispatch({type: 'REMOVE_INGREDIENT', item: type})
    }
}
export default withErrorHandler(withRouter(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)), axios);