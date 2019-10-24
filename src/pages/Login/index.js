import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from './../../store/actions/user';

import './styles.css';

const Login = (props) => {

    async function handleLogin () {
        await props.loginRequest();

        console.log(props.user);
    }

    return(
        <>
            <h1>Login</h1>
            { props.user.loading && <p>Loading</p> }
            { !props.user.loading && <button onClick={handleLogin}>Logar</button> }
        </>
    );
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);