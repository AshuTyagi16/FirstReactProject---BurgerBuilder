import React from 'react';
import Auc from '../../../hoc/Auc/Auc';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    let ingredientSummary = null;

    if (props.ingredients !== null) {
        ingredientSummary = Object.keys(props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}> {igKey}</span> : {props.ingredients[igKey]}</li>
            });
    }

    return (
        <Auc>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price</strong> : {props.price}</p>
            <p>Continue to checkout?</p>
            <Button
                btnType="Danger"
                clicked={props.canceled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.continued}>CONTINUE</Button>
        </Auc>
    );
};

export default orderSummary;