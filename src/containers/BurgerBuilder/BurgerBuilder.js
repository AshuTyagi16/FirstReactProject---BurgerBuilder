import React, {Component} from 'react';
import Auc from '../../hoc/Auc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


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
        totalPrice: 4
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
        }
    };

    render() {
        return (
            <Auc>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}/>
            </Auc>
        );
    }
}

export default BurgerBuilder;