import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import { withRouter } from 'react-router-dom';

class ContactData extends Component {
    state = {
        orderForm: {
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
            }
        },
        loading: false,
        ingredients: null,
        totalPrice: null
    }
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
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let customerData = {};
        for (let name in this.state.orderForm) {

            customerData[name] = this.state.orderForm[name]['value'];
        }

        const myOrder = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: customerData
        }
        console.log(myOrder);
        axios.post('/orders.json', myOrder).then(resp => {
            this.setState({loading: false, purchasing: false});
            this.props.history.push({
                pathname: '/',
                search: '?order=1'
            })
        }).catch(error => {
            console.log(error);
            this.setState({loading: false, purchasing: false});
        })
    }
    onUpdateInput = (event) => {
        const newOrderForm = {
            ...this.state.orderForm
        };
        const inputForm = newOrderForm[event.target.name];
        inputForm.value = event.target.value;
        inputForm.validation.isValid = this.checkValidaty(event.target.name, event.target.value);
        inputForm.validation.touched = true;
        this.setState({orderForm: newOrderForm})
    }

    checkValidaty = (name, value) => {
        const inputOrderForm = this.state.orderForm[name]['validation'];
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
    render() {
        let elements = [];
        let orderAllowed = true;
        for(let name in this.state.orderForm) {
            let el = this.state.orderForm[name];
            let createdInput = <Input
            invalid={!el.validation.isValid && el.validation.touched}
            changeHandler={this.onUpdateInput}
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
                <Button disabled={!orderAllowed} clicked={this.orderHandler} btnType="Success">ثبت سفارش</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h1>اطلاعات تماس خود را وارد کنید.</h1>
                { form }
            </div>
        );
    }
}

export default withRouter(ContactData);