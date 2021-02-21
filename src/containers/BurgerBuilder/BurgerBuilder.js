import React, { useState, useEffect } from 'react';
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
import * as burgerBuilderActions from '../../store/actions';
import * as orderActions from '../../store/actions';


const BurgerBuilder = props => {
    const { onInitIngredients } = props;
    const [translate_ingredient] = useState({
        salad: 'سالاد',
        bacon: 'بیکن',
        cheese: 'پنیر',
        meat: 'گوشت'
    });
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatedPurchaseState = () => {
        const sum = Object.keys(props.ings).map(igKey => {
            return props.ings[igKey];
        }).reduce((sum,el) => {
            return sum + el;
        }, 0);
        return sum > 0 && props.isAuthenticated;
    }
    const addIngredientHandler = (type) => {
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
    const removeIngredientHandler = (type) => {
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
    const purchaseHandler = () => {
        setPurchasing(true);
    };
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }
    const purchaseContinueHandler = () => {
        const query = [];
        query.push('price=' + encodeURIComponent(props.price));
        for (let i in props.ings) {
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(props.ings[i]));
        }
        props.history.push({
            pathname: '/checkout',
            search: '?' + query.join('&')
        });
    };

    const disabledInfo = {
        ...props.ings
    };
    for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    
    let orderSummary = props.error ? 'An error has been occurred!' : <OrderSummary
                    purchaseCanceled={purchaseCancelHandler}
                    purchaseContinued={purchaseContinueHandler}
                    price={props.price}
                    ingredients={props.ings}
                    translate_ingredient={translate_ingredient} />
    
    // if(loading) {
    //     orderSummary = <Spinner />
    // }
    return (
        <Aux>
            <Modal show={purchasing || props.error}
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            <Burger ingredients={props.ings} />
            <div>
                <BuildControls
                    ingredientAdded={props.onAddIngredient}
                    ingredientRemoved={props.onRemoveIngredient}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={updatedPurchaseState()}
                    ordered={purchaseHandler}
                    />
            </div>
        </Aux>
    );
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.order.error,
        isAuthenticated: state.auth.isAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (type) => dispatch(burgerBuilderActions.addIngredient(type)),
        onRemoveIngredient: (type) => dispatch(burgerBuilderActions.removeIngredient(type)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onPurchaseBurger: (data) => dispatch(orderActions.purchaseBurgerStart(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)   );