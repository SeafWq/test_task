import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3000/apiRouter/',
  headers: {
    'Content-type': 'application/json'
  }
})
