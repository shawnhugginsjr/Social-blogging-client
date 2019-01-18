import { applyMiddleware, createStore, combineReducers } from 'redux'
import { promiseMiddleware, localStorageMiddleware  } from './middleware'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import auth from './reducers/auth'
import common from './reducers/common'
import home from './reducers/home'
import settings from './reducers/settings'
import article from './reducers/article'
import articleList from './reducers/articleList'
import profile from './reducers/profile'
import editor from './reducers/editor'

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const reducer = combineReducers({
  auth,
  article,
  articleList,
  common,
  home,
  profile,
  settings,
  editor
})

const middleware = applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware)

export const store = createStore(reducer, middleware)