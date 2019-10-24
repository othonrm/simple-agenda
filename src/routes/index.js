import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './../hocs/PrivateRoute';

import Login from './../pages/Login';
import HomePage from './../pages/HomePage';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/home" component={HomePage} />
        </Switch>
    </BrowserRouter>
);

export default Routes;