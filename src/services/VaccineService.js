import apiClient from '@/services/AxiosClient.js'
export default {
  getTotalVaccines() {
    return apiClient.get('/vaccines')
  },
  updateVaccine(vaccine, pid, did) {
    return apiClient.post('/vaccine?pid=' + pid + '&did=' + did, vaccine)
  }
}
