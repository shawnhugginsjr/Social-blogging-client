import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return { appName: state.appName }
}

class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">
            {this.props.appName}
          </h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Banner)