import { defineStore } from 'pinia'
import { authApi } from '@/api/auth.ts'
import { useUserStore } from '@/stores/user.ts'

export const useAuthStore = defineStore('auth', () => {
  function registration(regData: unknown) {
    return authApi.registration(regData)
  }

  function auth(authData: unknown) {
    return authApi.auth(authData).then(({data}) => {
      localStorage.token = data.data.token
      useUserStore().getUserData()
    })
  }

  return {
    registration,
    auth
  }
})
