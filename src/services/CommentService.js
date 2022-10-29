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
  getTotalComments() {
    return apiClient.get('/comments')
  },
  getCommentByPatient(pid) {
    return apiClient.get('/commentsbypid?pid=' + pid)
  },
  addComment(comment, did, pid) {
    return apiClient.post('/comment?did=' + did + '&pid=' + pid, comment)
  }
}
