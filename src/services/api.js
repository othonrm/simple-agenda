import axios from 'axios';

export const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
});
