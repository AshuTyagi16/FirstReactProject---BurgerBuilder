import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Auc from '../../hoc/Auc/Auc';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    };

    render() {
        console.log(this.props);
        return (
            <Auc>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ingredients}/>
                <Route path={this.props.match.url + "/contact-data"}
                       render={(props) => (
                           <ContactData ingredients={this.props.ingredients}
                                        price={this.props.totalPrice} {...props}/>)}/>
            </Auc>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);