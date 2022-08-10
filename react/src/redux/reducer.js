import { combineReducers } from "redux";
import user from './modules/user';

export default function createReducer(){
    const rootReducer = combineReducers({
        user
    });
    return rootReducer;
}