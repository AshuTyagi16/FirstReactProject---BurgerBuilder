import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/AsyncComponent/asyncComponent';


const asyncCheckoutComponent = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});
const asyncOrdersComponent = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});
const asyncAuthComponent = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});


class App extends Component {

    componentDidMount() {
        this.props.onAuthCheckStatus();
    }

    render() {

        let routes = (
            <Switch>
                <Route path='/auth' component={asyncAuthComponent}/>
                <Route path='/' component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={asyncCheckoutComponent}/>
                    <Route path='/orders' component={asyncOrdersComponent}/>
                    <Route path='/auth' component={asyncAuthComponent}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/' component={BurgerBuilder}/>
                    <Redirect to='/'/>
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckStatus: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
