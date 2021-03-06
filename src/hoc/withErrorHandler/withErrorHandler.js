import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auc from '../../hoc/Auc/Auc';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        };

        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedhandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <Auc>
                    <Modal
                        modalClosed={this.errorConfirmedhandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auc>
            )
        }
    }
};

export default withErrorHandler;