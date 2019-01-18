import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Home from './Home'
import { Route, Switch } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Settings from '../components/Settings'
import agent from '../agent'
import Article from './Article'
import Profile from './Profile'
import ProfileFavorites from './ProfileFavorites'
import Editor from './Editor'
import { store } from '../store'
import { push } from 'react-router-redux'

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: 'APP_LOAD', payload, token }),
  onRedirect: () =>
    dispatch({ type: 'REDIRECT' })
})

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo))
      this.props.onRedirect()
    }
  }

  // Check if an user already has a JSON webtoken saved to local storage
  componentWillMount() {
    const token = window.localStorage.getItem('jwt')
    if (token) {
      agent.setToken(token)
    }
    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header />
          <Switch>
          <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
        </div>
      )
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)