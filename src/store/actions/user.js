export const loginRequest = (username, password) => ({ 
    type: 'LOGIN_REQUEST',
    payload: { username, password }
});

export const loginSuccess = (data) => ({ 
    type: 'LOGIN_SUCCESS',
    payload: { data }
});