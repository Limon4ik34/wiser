import { baseApiUrl } from '@/shared/consts.ts'
import axios from 'axios'
export const authApi = {
  registration (regData: unknown) {
    return axios.post(`${baseApiUrl}/auth/registration`, regData)
  },
  auth (authData: unknown) {
    return axios.post(`${baseApiUrl}/auth/auth`, authData)
  },
  getUserData () {
    const token = localStorage.token
    return axios.get(`${baseApiUrl}/auth/user-data`, {
      headers: {
        authorization: token
      }
    })
  }
}