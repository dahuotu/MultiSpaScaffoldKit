import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer'

const store = configureStore({
    reducer: {
        counter: rootReducer.reducer
    },
    middleware: [thunk, logger]
}, composeWithDevTools());

export default store;