import LinkCheckerReducer from "./link";
import StyleReducer from "./style";
import {combineReducers} from "redux";

const rootReducer=combineReducers({
    links:LinkCheckerReducer,
    styles:StyleReducer,
});

export default rootReducer;