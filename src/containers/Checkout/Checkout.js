import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Auc from '../../hoc/Auc/Auc';
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import ContactData from "./ContactData/ContactData";
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    componentWillMount() {
        this.props.onInitPurchased();
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/"/>;
        const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;

        if (this.props.ingredients) {
            summary = (
                <div>
                    <CheckoutSummary
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ingredients}/>

                    <Route path={this.props.match.url + "/contact-data"}
                           component={ContactData}/>
                </div>
            );
        }
        return (
            <Auc>
                {purchasedRedirect}
                {summary}
            </Auc>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchased: () => dispatch(actions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);