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
  },
  getAuthorData (id: unknown) {
    const token = localStorage.token
    return axios.get(`${baseApiUrl}/author/${id}`, {
      headers: {
        authorization: token
      }
    })
  },
  setUserData (userData: unknown) {
    const token = localStorage.token
    return axios.patch(`${baseApiUrl}/auth/user-data`, userData,{
      headers: {
        authorization: token
      }
    })
  },
}