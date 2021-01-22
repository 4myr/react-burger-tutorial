import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'AMYR',
                address: {
                    street: '17 Shahrivar',
                    zipCode: '42424',
                    country: 'Germany'
                },
                email: 'awp.1379@gmail.com'
            },
            'deliveryMethod': 'fastest'
        };
        axios.post('/orders.json', order).then(resp => {
            console.log(resp);
            this.setState({loading: false, purchasing: false});
            console.log(this.props);
            this.props.history.push({
                pathname: '/',
                search: '?order=1'
            })
        }).catch(error => {
            console.log(error);
            this.setState({loading: false, purchasing: false});
        })
    }
    render() {
        let form = (
            <form>
                <label htmlFor="NameInput">نام شما: </label>
                <input id="NameInput" type="text" name="name" placeholder="نام خود را وارد کنید" />
                <label htmlFor="EmailInput">ایمیل شما: </label>
                <input id="EmailInput" type="email" name="email" placeholder="ایمیل خود را وارد کنید" />
                <label htmlFor="StreetInput">خیابان شما: </label>
                <input id="StreetInput" type="text" name="address[street]" placeholder="خیابان محل سکونت را وارد کنید" />
                <label htmlFor="PostalCodeInput">کد پستی: </label>
                <input id="PostalCodeInput" type="text" name="address[postalCode]" placeholder="کد پستی خود را وارد کنید" />
                <Button clicked={this.orderHandler} btnType="Success">ثبت سفارش</Button>
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

export default ContactData;