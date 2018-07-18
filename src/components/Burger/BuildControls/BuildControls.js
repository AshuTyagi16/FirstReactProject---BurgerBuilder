import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price is : <strong>{props.price}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                removed={() => props.ingredientRemoved(ctrl.type)}
                added={() => props.ingredientAdded(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
        <button
            disabled={!props.purchasable}
            className={classes.OrderButton}
            onClick={props.ordered}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>
    </div>
);

export default buildControls;