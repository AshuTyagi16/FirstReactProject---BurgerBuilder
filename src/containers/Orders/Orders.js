import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        const fetchedOrders = [];
        axios.get('/orders.json')
            .then(response => {
                console.log(response.data);
                for (let key in response.data) {
                    fetchedOrders.push({
                        key,
                        ...response.data[key]
                    })
                }
                this.setState({orders: fetchedOrders, loading: false});
            })
            .catch(error => {
                this.setState({orders: [], loading: false});
            });
    }

    render() {

        let orders = null;
        if (this.state.loading) {
            orders = <Spinner/>;
        } else {
            orders =
                this.state.orders.map(order => {
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

export default withErrorHandler(Orders, axios);