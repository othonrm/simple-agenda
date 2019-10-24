import React, { useEffect } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Creators as UserActions } from './../../store/ducks/user';

import './styles.css';

const Login = (props) => {

    useEffect(() => {

        const isLogged = (props.user.data && props.user.data.user_name) !== null;

        if(isLogged)
        {
            props.history.push('/home');
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.user.data])
    
    async function handleLogin () {
        await props.loginRequest();
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

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);