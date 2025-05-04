import { aiKey, aiApiUrl } from '../index.js'
import axios from 'axios'

export default function (server) {
  server.post('/ai-message', async (query, res) => {
    const body = {
      message: query.body.message,
      api_key: aiKey
    }
    console.log(body)
    axios.request({
      method: 'POST',
      url: aiApiUrl,
      data: body,
    }).then((result) => {
      res.status(200).sendWrappedNew(result.data)
    }).catch((err) => {
      console.log(err)
      res.status(402).sendWrapped({})
    })
  })
}
