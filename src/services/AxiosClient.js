import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://44.210.140.37:8999',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default apiClient
