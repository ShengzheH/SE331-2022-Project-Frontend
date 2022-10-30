import apiClient from '@/services/AxiosClient.js'

export default {
  getTotalPeoples() {
    return apiClient.get('/patients')
  },
  getPeople(id) {
    return apiClient.get('/patient/' + id)
  },
  getPeoples(perPage, page) {
    return apiClient.get('/patients?_limit=' + perPage + '&_page=' + page)
  },
  updateFile(file) {
    let formDate = new FormData()
    formDate.append('file', file)
    return apiClient.post('/uploadFile', formDate, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  changeimage(patient1) {
    let patient = patient1
    return apiClient.post('/patientimage', patient)
  }
}
