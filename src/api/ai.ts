import { baseApiUrl } from '@/shared/consts.ts'
import axios from 'axios'
export const aiApi = {
  sendMessage (message: string) {
    const body = {
      message: message,
    }
    return axios.post(`${baseApiUrl}/ai-message`, body)
  },
}