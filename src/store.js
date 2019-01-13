import { applyMiddleware, createStore } from 'redux'
import { promiseMiddleware } from './middleware'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const defaultState = {
  appName: 'article-client',
  articles: null
}
const reducer = function (state = defaultState, action) {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return { ...state, articles: action.payload.articles }
    default:
      return state
  }
}

applyMiddleware(myRouterMiddleware, promiseMiddleware)

export const store = createStore(reducer, applyMiddleware(promiseMiddleware))