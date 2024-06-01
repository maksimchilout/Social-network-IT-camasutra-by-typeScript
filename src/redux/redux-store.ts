import {
        Action,
        applyMiddleware,
        combineReducers,
        createStore
} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import { reducer as formReducer} from "redux-form";
import appReducer from "./app-reducer";

let rootReducers = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sideBar: sidebarReducer,
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer,
        form: formReducer

    }
)

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>


export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>, >= ThunkAction<R, AppStateType, unknown, A>
let store = createStore(rootReducers, applyMiddleware(thunkMiddleware));


export default store