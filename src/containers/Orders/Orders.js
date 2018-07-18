import React, {Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders(this.props.token);
    }

    render() {

        let orders = null;
        if (this.props.loading) {
            orders = <Spinner/>;
        } else {
            orders =
                this.props.orders.map(order => {
                    return (
                        <Order
                            key={order.key}
                            price={order.price}
                            ingredients={order.ingredients}/>
                    )
                })
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));