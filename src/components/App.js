import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Home from './Home'
import { Route, Switch } from 'react-router-dom'
import Login from '../components/Login'

const mapStateToProps = (state) => {
  return { appName: state.common.appName }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)