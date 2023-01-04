import axios from 'axios'
import Swal from 'sweetalert2'

export const baseURL = process.env.NODE_ENV === 'production' ? 'https://stark-temple-81519.herokuapp.com/api' : 'http://localhost:3000/api'

export const apiHelper = axios.create({
  baseURL
})

export const Toast  = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})