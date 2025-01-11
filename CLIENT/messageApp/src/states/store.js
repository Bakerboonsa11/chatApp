import { combineReducers } from 'redux';
import { createStore } from 'redux';
import {UserReducer,signUpReduces} from './reducers'

const rootReducer=combineReducers({
    authentication:UserReducer,
    signUpFormData:signUpReduces
})

const store =createStore(rootReducer)

export default store;