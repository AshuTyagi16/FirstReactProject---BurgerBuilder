import React from 'react';
import Auc from '../../hoc/Auc';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const layout = (props) => (
    <Auc>
        <Toolbar/>
        <main className={classes.Content}>
            {props.children}

        </main>
    </Auc>
);

export default layout;