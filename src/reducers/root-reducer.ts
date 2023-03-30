import { combineReducers } from "redux";
import alertReducer from "./alerts/alerts";
import paulReducer from "./paulactions/paulactions";



const RootReducer = combineReducers({
    alerts: alertReducer,
    paul: paulReducer,
});

export default RootReducer