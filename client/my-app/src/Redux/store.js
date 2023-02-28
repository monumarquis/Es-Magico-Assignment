import {
    legacy_createStore,
    combineReducers,
    applyMiddleware,
    compose
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { userProfileReducer } from "./userProfile/userprofile.reducer";
import { allUserProfileReducer } from "./allUsers/allUsers.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userProfileReducer,
    allUser: allUserProfileReducer
});

const createCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
    rootReducer,
    createCompose(applyMiddleware(thunk))
);