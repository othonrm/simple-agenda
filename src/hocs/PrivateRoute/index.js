import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...mainProps }) => (

    <Route {...mainProps} render={props => {

            if(mainProps.isLogged)
            {
                return ( <Component {...props} /> );
            }
            else
            {
                return ( <Redirect to={{ pathname: '/', state: { from: props.location } }} /> );
            }
        }
    }/>
);

const mapStateToProps = state => ({
  isLogged: (state.user.data && state.user.data.user_name) !== null
});

export default connect(mapStateToProps)(PrivateRoute);