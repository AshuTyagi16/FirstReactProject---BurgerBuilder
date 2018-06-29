import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact
            link="/">BurgerBuilder
        </NavigationItem>
        <NavigationItem
            link="/orders">My Orders
        </NavigationItem>
    </ul>
);

export default navigationItems;