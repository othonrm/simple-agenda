const INITIAL_STATE = {
    loading: false,
    data: null
};

export default function events(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'LOGIN_REQUEST':
            return {...state, loading: true};
        case 'LOGIN_SUCCESS':
            return {...state, data: action.payload.data, loading: false};
        default:
            return state;
    }
}