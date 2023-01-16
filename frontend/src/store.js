import { configureStore, combineReducers } from "@reduxjs/toolkit"
import thunk from "redux-thunk";


const reducer = combineReducers({});

const initialState = {};

const middleware = [thunk]

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    middleware: middleware,
})

export { initialState, store };
