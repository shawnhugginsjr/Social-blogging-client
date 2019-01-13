import agent from './agent'

// Handle action payloads that are promises
const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    // Prevent a user from spamming the login submit button
    store.dispatch({ type: 'ASYNC_START', subtype: action.type })
    action.payload.then(
      res => {
        action.payload = res
        store.dispatch(action)
      },
      error => {
        action.error = true
        action.payload = error.response.body
        store.dispatch(action)
      }
    )
    return
  }
  next(action)
}

function isPromise(v) {
  return v && typeof v.then === 'function'
}

// Store the JSON webtoken in local storage
const localStorageMiddleware = store => next => action => {
  if (action.type === 'REGISTER' || action.type === 'LOGIN') {
    if (!action.error) {
      console.log('About to save uer token')
      console.log('action.payload.user.token')
      window.localStorage.setItem('jwt', action.payload.user.token)
      agent.setToken(action.payload.user.token)
    }
  } else if (action.type === 'LOGOUT') {
    window.localStorage.setItem('jwt', '')
    agent.setToken(null)
  }

  next(action)
}

export {
  promiseMiddleware,
  localStorageMiddleware
}