import React from 'react'
import Banner from './Banner'
import MainView from './MainView'
import { connect } from 'react-redux'
import agent from '../../agent'
import Tags from './Tags'

const Promise = global.Promise;

const mapStateToProps = (state) => {
  return {
    ...state.home,
    appName: state.appName,
    token: state.common.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (tab, payload) =>
      dispatch({ type: 'HOME_PAGE_LOADED', tab, payload }),
    onUnload: () =>
      dispatch({ type: 'HOME_PAGE_UNLOADED' }),
    onClickTag: (tag, payload) =>
      dispatch({ type: 'APPLY_TAG_FILTER', tag, payload }),
  }
}

class Home extends React.Component {

  componentWillMount = () => {
    const tab = this.props.token ? 'feed' : 'all'
    const articlesPromise = this.props.token ?
      agent.Articles.feed() :
      agent.Articles.all();

    this.props.onLoad(tab, Promise.all([agent.Tags.getAll(), articlesPromise]));
    
  }

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
                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)