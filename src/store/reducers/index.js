import LinkCheckerReducer from "./link";
import StyleReducer from "./style";
import LayoutReducer from "./layout"
import {combineReducers} from "redux";

const rootReducer=combineReducers({
    links:LinkCheckerReducer,
    styles:StyleReducer,
    LayoutReducer:LayoutReducer,
});

export default rootReducer;