import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import Auc from '../../hoc/Auc/Auc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false
    };

    updatePurchaseStateHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };

    purchasingHandler = () => {
        this.setState({purchasing: true});
    };

    purchasingCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchasingContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {
        let disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
            price={this.props.totalPrice}
            continued={this.purchasingContinueHandler}
            canceled={this.purchasingCancelHandler}
            ingredients={this.props.ingredients}/>;

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
        return (
            <Auc>
                <Modal
                    modalClosed={this.purchasingCancelHandler}
                    show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    ordered={this.purchasingHandler}
                    price={this.props.totalPrice}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    purchasable={this.updatePurchaseStateHandler(this.props.ingredients)}
                    disabled={disabledInfo}/>
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

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));