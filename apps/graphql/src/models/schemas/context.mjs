import axios from 'axios'

export const context = () => {
  return {
    getInvoice: (path = '/') => axios.get('http://localhost:8080' + path),
  }
}
