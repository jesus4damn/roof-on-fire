import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import { rootReducer, RootState } from './rootReducer';

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
    const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
    return createStore(rootReducer, initialState, enhancer);
};

const store = configureStore();

if (typeof module.hot !== 'undefined') {
    module.hot.accept('./rootReducer', () =>
        store.replaceReducer(require('./rootReducer').rootReducer)
    );
}

export default store;
