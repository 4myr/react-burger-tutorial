import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import classes from './Orders.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: null,
        loading: false
    }
    componentDidMount() {
        axios.get('/orders.json').then(resp => {
            const fetchedOrders = [];
            for (let i in resp.data) {
                fetchedOrders.push({
                    id: i,
                    ...resp.data[i]
                })
            }
            this.setState({orders: fetchedOrders, loading: false})
        }).catch(err => {
            console.log(err);
            this.setState({loading: false})
        });
    }
    render() {
        let orders = (
            <Spinner />
        )
        
        if (this.state.orders) {
            orders = this.state.orders.map(v => {
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
}

export default Orders;