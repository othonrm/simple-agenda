import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import './config/reactotron';

import store from './store';

import './App.css';

import HomePage from './pages/HomePage';

console.tron.log("Testando");

const App = () => (
    <Provider store={store}>
        <HomePage />
        <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_RIGHT} />
    </Provider>
)

export default App;