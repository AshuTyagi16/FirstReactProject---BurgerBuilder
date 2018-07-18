import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auc from '../../../hoc/Auc/Auc';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auc>
            <Backdrop
                clicked={props.closed}
                show={props.open}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems
                        isAuthenticated={props.isAuthenticated}/>
                </nav>
            </div>
        </Auc>
    )
};

export default sideDrawer;