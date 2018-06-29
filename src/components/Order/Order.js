import React from 'react';
import classes from './Order.css';

const order = (props) => {
    console.log(props.ingredients);
    return (
        <div className={classes.Order}>
            <strong>Ingredients</strong>
            {Object.keys(props.ingredients)
                .map(igKey => {
                    return (
                        <div
                            key={igKey}>
                            <strong>{igKey} : {props.ingredients[igKey]}</strong>
                        </div>
                    )
                })}
            <p>Price : <strong>${props.price}</strong></p>
        </div>
    );
};

export default order;