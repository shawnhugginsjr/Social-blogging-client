import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://localhost:3000/api'

const responseBody = (res) => { return res.body }

const requests = {
  get: (url) => superagent.get(`${API_ROOT}${url}`).then(responseBody)
}

const Articles = {
  all: (page) => requests.get(`/articles?limit=10`)
}

export default {
  Articles
}