import { combineReducers } from "redux";
import alertReducer from "./alerts/alerts";
import paulReducer from "./paulactions/paulactions";
import testReducer from "./testreducer/testreducer";
import testDataReducer from "./testdata/testdata";



const RootReducer = combineReducers({
    alerts: alertReducer,
    paul: paulReducer,
    testReducer,
    testDataReducer
});

export default RootReducer