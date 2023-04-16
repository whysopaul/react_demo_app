import { combineReducers } from "redux";
import alertReducer from "./alerts/alerts";
import paulReducer from "./paulactions/paulactions";
import testReducer from "./testreducer/testreducer";
import testDataReducer from "./testdata/testdata";
import rephraseReducer from "./rephrase/rephrase";
import { authReducer } from "./auth/auth";



const RootReducer = combineReducers({
    alerts: alertReducer,
    paul: paulReducer,
    testReducer,
    testDataReducer,
    rephraseReducer,
    authReducer
});

export default RootReducer