import React, { useState } from 'react';
import classes from './ContactData.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions';
import Modal from '../../UI/Modal/Modal'

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'نام شما',
            placeholder: 'نام خود را وارد کنید.'
        },
        value: '',
        validation: {
            shouldValidate: true,
            isValid: false,
            touched: false,
            rules: {
                required: true
            }
        }
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            label: 'ایمیل شما',
            placeholder: 'ایمیل خود را وارد کنید.'
        },
        value: '',
        validation: {
            shouldValidate: true,
            isValid: false,
            touched: false,
            rules: {
                required: true
            }
        }
    },
    street: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'خیابان سکونت شما',
            placeholder: 'خیابان سکونت خود را وارد کنید.'
        },
        value: '',
        validation: {
            shouldValidate: true,
            isValid: false,
            touched: false,
            rules: {
                required: true
            }
        }
    },
    postalCode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'کد پستی شما',
            placeholder: 'کد پستی خود را وارد کنید.'
        },
        value: '',
        validation: {
            shouldValidate: true,
            isValid: false,
            touched: false,
            rules: {
                required: true,
                minLength: 5,
                maxLength: 7
            }
        }
    },
    delivery_method: {
        elementType: 'dropdown',
        elementConfig: {
            type: 'text',
            label: 'نوع ارسال',
            options: [
                {
                    value: 'fastest',
                    displayValue: 'سریع ترین'
                },
                {
                    value: 'cheapest',
                    displayValue: 'ارزان ترین'
                }
            ]
        },
        validation: {
            shouldValidate: false,
            isValid: true,
            touched: false,
            rules: null
        },
        value: 'cheapest',
    }});
    const [loading, setLoading] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        let customerData = {};
        for (let name in orderForm) {
            customerData[name] = orderForm[name]['value'];
        }

        const myOrder = {
            ingredients: props.ings,
            price: props.price,
            customer: customerData,
            userId: localStorage.getItem('userId')
        }
        props.onPurchaseStart(myOrder);
        // console.log(myOrder);
        // axios.post('/orders.json', myOrder).then(resp => {
        //     this.setState({loading: false, purchasing: false});
        //     props.history.push({
        //         pathname: '/',
        //         search: '?order=1'
        //     })
        // }).catch(error => {
        //     console.log(error);
        //     this.setState({loading: false, purchasing: false});
        // })
    }
    const onUpdateInput = (event) => {
        const newOrderForm = {
            ...orderForm
        };
        const inputForm = newOrderForm[event.target.name];
        inputForm.value = event.target.value;
        inputForm.validation.isValid = checkValidaty(event.target.name, event.target.value);
        inputForm.validation.touched = true;
        setOrderForm(newOrderForm);
    }

    const checkValidaty = (name, value) => {
        const inputOrderForm = orderForm[name]['validation'];
        if (!inputOrderForm.shouldValidate)
            return true;
        let isValid = true;
        if (inputOrderForm.rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (inputOrderForm.rules.minLength) {
            isValid = value.length >= inputOrderForm.rules.minLength && isValid;
        }
        if (inputOrderForm.rules.maxLength) {
            isValid = value.length <= inputOrderForm.rules.maxLength && isValid;
        }
        return isValid;
    }
    const onModalClosed = () => {

    }
    let elements = [];
    let orderAllowed = true;
    for(let name in orderForm) {
        let el = orderForm[name];
        let createdInput = <Input
        invalid={!el.validation.isValid && el.validation.touched}
        changeHandler={onUpdateInput}
        key={name}
        name={name}
        inputtype={el.elementType}
        config={el.elementConfig}
        value={el.value} />
        elements.push(createdInput)
        
        orderAllowed = orderAllowed && el.validation.isValid;

    };
    let form = (
        <form>
            { elements }
            <Button disabled={!orderAllowed} clicked={orderHandler} btnType="Success">ثبت سفارش</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />
    }
    let ordering = (
        <Modal show={props.error} modalClosed={onModalClosed}>
            {props.error}
        </Modal>,
        <div className={classes.ContactData}>
            <h1>اطلاعات تماس خود را وارد کنید.</h1>
            { form }
        </div>
    );
    if (props.purchased) {
        props.history.push({
            pathname: '/',
            search: '?order=1'
        });
    }
    return ordering;
}


const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        error: state.order.error,
        purchased: state.order.purchased
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onPurchaseStart: (data) => dispatch(orderActions.purchaseBurgerStart(data))
    }
}
export default withErrorHandler(withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactData)), axios);