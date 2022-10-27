import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default {
  getTotalPeoples() {
    return apiClient.get('/patients')
  },
  getPeople(id) {
    return apiClient.get('/patient/' + id)
  },
  getPeoples(perPage, page) {
    return apiClient.get('/patients?_limit=' + perPage + '&_page=' + page)
  }
}
