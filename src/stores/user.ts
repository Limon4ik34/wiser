import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api/auth.ts'
export interface IUser {
  nik: string
  login: string
  about: string
  avatar: string
  phone: string
  email: string
}
export const useUserStore = defineStore('user', () => {
  const user: Ref<IUser | null> = ref(null)

  function getUserData() {
    authApi.getUserData().then(({data}) => {
      user.value = data.data
    }).catch(() => {
      delete localStorage.token
    })
  }
  function getAuthorData(id: unknown) {
    return authApi.getAuthorData(id)
  }
  function setUserData(user: unknown) {
    authApi.setUserData(user).then(() => {
      getUserData()
    })
  }
  return {
    user,
    getUserData,
    getAuthorData,
    setUserData
  }
})
