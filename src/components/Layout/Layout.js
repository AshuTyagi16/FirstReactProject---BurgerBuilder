import React from 'react';
import Auc from '../../hoc/Auc';
import classes from './Layout.css';

const layout = (props) => (
    <Auc>
        <div>Toolbar, Drawer, BackDrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auc>
);

export default layout;