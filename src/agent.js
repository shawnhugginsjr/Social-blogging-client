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
  get: (url) => superagent.get(`${API_ROOT}${url}`).use(setAuthHeader).then(responseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(setAuthHeader).then(responseBody),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(setAuthHeader).then(responseBody)
}

const Articles = {
  all: (page) => requests.get(`/articles?limit=10`)
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
  setToken: _token => { token = _token }
}