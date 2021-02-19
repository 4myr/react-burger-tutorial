import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import classes from './Orders.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as orderActions from '../../store/actions'

class Orders extends Component {
    componentDidMount() {
        // axios.get('/orders.json').then(resp => {
        //     const fetchedOrders = [];
        //     for (let i in resp.data) {
        //         fetchedOrders.push({
        //             id: i,
        //             ...resp.data[i]
        //         })
        //     }
        //     this.setState({orders: fetchedOrders, loading: false})
        // }).catch(err => {
        //     console.log(err);
        //     this.setState({loading: false})
        // });
        this.props.onFetchOrders();
    }
    render() {
        let orders = (
            <Spinner />
        )
        
        if (this.props.error) {
            orders = <p>An Error ocurred</p>;
        }
        else if (!this.props.isAuthenticated) {
            orders = <Redirect to="/" />
        }
        else if (this.props.orders) {
            orders = this.props.orders.map(v => {
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