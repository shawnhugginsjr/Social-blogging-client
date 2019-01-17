import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://localhost:3000/api'

const responseBody = (res) => { return res.body }

let token = null
const setAuthHeader = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  get: (url) =>
    superagent.get(`${API_ROOT}${url}`).use(setAuthHeader).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(setAuthHeader).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(setAuthHeader).then(responseBody),
  del: (url) =>
    superagent.del(`${API_ROOT}${url}`).use(setAuthHeader).then(responseBody)
}

const Articles = {
  all: (page) =>
    requests.get(`/articles?limit=10`),
  get: (slug) =>
    requests.get(`/articles/${slug}`),
  del: (slug) =>
    requests.del(`/articles/${slug}`)
}

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
}

const Auth = {
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  current: () => requests.get('/user'),
  register: (username, email, password) => requests.post('/users', { user: { username, email, password } }),
  save: user => requests.put('/user', { user })
}

export default {
  Articles,
  Auth,
  Comments,
  setToken: _token => { token = _token }
}