import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://192.168.1.3:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default {
  getTotalVaccines() {
    return apiClient.get('/vaccines')
  }
}
