import LinkCheckerReducer from "./link";
import {combineReducers} from "redux";

const rootReducer=combineReducers({
    links:LinkCheckerReducer
});

export default rootReducer;