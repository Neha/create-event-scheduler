import {combineReducers} from "redux";
import getEventListReducer from "./getEventListReducer";
import updateEventListenerReducer from "./updateEventListenerReducer";

export default combineReducers({
    getEventList : getEventListReducer,
    updateEventList : updateEventListenerReducer
})