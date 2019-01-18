export default (state = {}, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        tab: action.tab,
        current_page: 0
      }
    case 'APPLY_TAG_FILTER':
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag
      }
    case 'CHANGE_TAB':
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: action.tab,
        tag: null,
        current_page: 0
      }
    case 'SET_PAGE':
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.page
      }
    case 'HOME_PAGE_UNLOADED':
      return {}
    case 'PROFILE_PAGE_LOADED':
    case 'PROFILE_FAVORITES_PAGE_LOADED':
      return {
        ...state,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount
      }
    case 'PROFILE_PAGE_UNLOADED':
    case 'PROFILE_FAVORITES_PAGE_UNLOADED':
      return {}
  }

  return state
}