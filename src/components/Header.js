import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  onUnload: () => dispatch({ type: 'CURRENT_USER_PROFILE_HEADER_CLICKED' })
})

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    profileUser: state.profile.username
  }
}

const UserStatus = (props) => {
  if (!props.currentUser) {
    // Render the user not logged in view
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="register" className="nav-link">
            Sign up
          </Link>
        </li>
      </ul>
    )
  } else {
    // render the user logged in view

    // Go to the current user's profile if they're not already
    // on their profile page
    const goToProfile = () => {
      if (props.currentUser.username !== props.profileUser) {
        return props.onUnload()
      }
    }

    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            onClick={goToProfile}
            to={`/@${props.currentUser.username}`}
            className="nav-link">
            <img src={props.currentUser.image} className="user-pic" />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {this.props.appName}
          </Link>

          <UserStatus 
            currentUser={this.props.currentUser} 
            onUnload={this.props.onUnload}
            profileUser={this.props.profileUser}
            />
        </div>
      </nav>
    )
  }
}

//export default Header
export default connect(mapStateToProps, mapDispatchToProps)(Header)