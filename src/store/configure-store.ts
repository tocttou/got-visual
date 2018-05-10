import { compose, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import rootReducer from "../reducers";
import { IImmutableInitialState } from "../reducers/initial-state";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export default function configureStore(initialState: IImmutableInitialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
