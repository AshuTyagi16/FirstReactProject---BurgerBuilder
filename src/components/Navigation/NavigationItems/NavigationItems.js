import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            active={true}
            link="/">BurgerBuilder
        </NavigationItem>
        <NavigationItem
            active={true}
            link="/">Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;