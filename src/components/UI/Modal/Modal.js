import React, {Component} from 'react';
import classes from './Modal.css';
import Auc from '../../../hoc/Auc/Auc';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Auc>
                <Backdrop
                    clicked={this.props.modalClosed}
                    show={this.props.show}/>
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </Auc>
        );
    }
}

export default Modal;