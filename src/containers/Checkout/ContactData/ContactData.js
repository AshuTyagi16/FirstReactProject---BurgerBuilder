import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: 0
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Ashu Tyagi',
                address: {
                    street: 'Wall Street',
                    zipCode: 110093,
                    country: 'India'
                },
                email: 'ashu.knock@gmail.com'
            },
            deliveryMethod: 'Fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
                this.props.history.push('/');
                console.log(response);
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
                console.log(error);
            });
    };

    render() {
        let form = (<form>
            <strong>Enter Contact Data Here</strong>
            <input type="text" name={this.state.name} placeholder="Your Name"/>
            <input type="text" name={this.state.email} placeholder="Your Mail"/>
            <input type="text" name={this.state.street} placeholder="Street"/>
            <input type="text" name={this.state.zipCode} placeholder="Zip Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default ContactData;