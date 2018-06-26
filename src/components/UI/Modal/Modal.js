import React from 'react';
import classes from './Modal.css';
import Auc from '../../../hoc/Auc';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Auc>
        <Backdrop
            clicked={props.modalClosed}
            show={props.show}/>
        <div
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
            className={classes.Modal}>
            {props.children}
        </div>
    </Auc>
);

export default modal;