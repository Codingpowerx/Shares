import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer, forgotPasswordReducer } from './reducers/userReducers'
import { allFilesReducer } from './reducers/fileReducers'

const reducer = combineReducers({
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    allfiles: allFilesReducer
})

let initialState = {}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;