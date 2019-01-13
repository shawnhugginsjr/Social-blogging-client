import { applyMiddleware, createStore, combineReducers } from 'redux'
import { promiseMiddleware, localStorageMiddleware  } from './middleware'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import auth from './reducers/auth'
import common from './reducers/common'
import home from './reducers/home'

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const reducer = combineReducers({
  auth,
  common,
  home
})

const middleware = applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware)

export const store = createStore(reducer, middleware)