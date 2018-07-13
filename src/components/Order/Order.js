import React from 'react';
import classes from './Order.css';

const order = (props) => {
    return (
        <div className={classes.Order}>
            <strong>Ingredients</strong>
            <div className={classes.OrderIngredientContainer}>
            {Object.keys(props.ingredients)
                .map(igKey => {
                    return (
                        <div className={classes.OrderIngredient}
                             key={igKey}>
                            <strong>{igKey} : {props.ingredients[igKey]}</strong>
                        </div>
                    )
                })}
            </div>
            <p>Price : <strong>${props.price}</strong></p>
        </div>
    );
};

export default order;