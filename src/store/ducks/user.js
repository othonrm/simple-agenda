import { toast } from 'react-toastify';

export const Types = {
    LOGIN_REQUEST: 'user/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'user/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'user/LOGIN_FAILURE',
}

const INITIAL_STATE = {
    loading: false,
    data: null,
    error: null
};

export default function events(state = INITIAL_STATE, action) {
    switch(action.type) {
        case Types.LOGIN_REQUEST:
            return {...state, loading: true, error: null};
        case Types.LOGIN_SUCCESS:
            return {...state, data: action.payload.data, loading: false, error: null};
        case Types.LOGIN_FAILURE:
            toast.error(`Algo deu errado durante o login! (Info: ${action.payload.error.message})`);
            console.log(action.payload.error);
            return {...state, error: action.payload.error, loading: false};
        default:
            return state;
    }
}

export const Creators = {
    loginRequest: (username, password) => ({ 
        type: Types.LOGIN_REQUEST,
        payload: { username, password }
    }),
    
    loginSuccess: data => ({ 
        type: Types.LOGIN_SUCCESS,
        payload: { data }
    }),
    loginFailure: error => ({ 
        type: Types.LOGIN_FAILURE,
        payload: { error }
    }),
}
    

