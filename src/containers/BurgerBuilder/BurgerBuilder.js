import React, {Component} from 'react';
import Auc from '../../hoc/Auc/Auc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    meat: 3,
    bacon: 1
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        purchasable: false,
        totalPrice: 4,
        purchasing: false,
        loading: false
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const updatedPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newTotalPrice = oldPrice + updatedPrice;

        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});
        this.updatePurchaseStateHandler(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount >= 1) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };

            updatedIngredients[type] = updatedCount;

            const updatedPrice = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newTotalPrice = oldPrice - updatedPrice;

            this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});
            this.updatePurchaseStateHandler(updatedIngredients);
        }
    };

    updatePurchaseStateHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0});
    };

    purchasingHandler = () => {
        this.setState({purchasing: true});
    };

    purchasingCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchasingContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                console.log(response);
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
                console.log(error);
            });
    };

    render() {
        let disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
            price={this.state.totalPrice}
            continued={this.purchasingContinueHandler}
            canceled={this.purchasingCancelHandler}
            ingredients={this.state.ingredients}/>;

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
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ordered={this.purchasingHandler}
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    disabled={disabledInfo}/>
            </Auc>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);