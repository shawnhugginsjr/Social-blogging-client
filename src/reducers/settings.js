export default (state = {}, action) => {
  switch (action.type) {
    case 'SETTINGS_SAVED':
      console.log('settings saved')
      console.log(action)
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      }
    case 'ASYNC_START':
      return {
        ...state,
        inProgress: true
      }
  }

  return state
}