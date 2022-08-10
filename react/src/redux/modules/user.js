import { SET_USER, SET_USER_LOGOUT } from "../actions/actionConstants";

const initialState = {
    user: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            for (const [key, value] of Object.entries(action.payload))
                state[key] = value;
            return { ...state };
            
        case SET_USER_LOGOUT:
            state['user'] = null;
            return { ...state };
            break;
        default:
            return state
    }
}