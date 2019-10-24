import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './../pages/Login';
import HomePage from './../pages/HomePage';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={HomePage} />
        </Switch>
    </BrowserRouter>
);

export default Routes;