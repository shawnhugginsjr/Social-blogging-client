import React from 'react'
import Banner from './Banner'
import MainView from './MainView'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return { appName: state.appName }
}

class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        <Banner />
        <div className="container page">
          <div className="row">
            <MainView />
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home)