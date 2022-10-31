import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import initialState from './initialState';

const store = configureStore({    
    reducer: rootReducer,
    preloadedState: initialState
})

export default store;

store.subscribe(() => console.info(store.getState())) // Для отладки