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
  getTotalDoctors() {
    return apiClient.get('/doctors')
  },
  getDoctor(id) {
    return apiClient.get('/doctor/' + id)
  },
  getDoctorPatient(id) {
    return apiClient.get('/doctorpatient/' + id)
  },
  getDoctors(perPage, page) {
    return apiClient.get('/doctors?_limit=' + perPage + '&_page=' + page)
  }
}
