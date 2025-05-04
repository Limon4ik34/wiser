import {
  getQueryParams,
  readData
} from '../utils/utils.js'
import db from '../utils/db.js'

const file = './json/products.json'
export default function (server) {
  server.get('/products', async (query, res) => {
    const { product } = getQueryParams(query.query)
    let data = readData(file)
    data = data[product]
    res.sendWrapped({ ...data })
  })
  server.get('/products/:id', async (query, res) => {
    db.getProductBySlug( query.params.id).then((result) => {
      res.sendWrapped(result)
    }).catch((err) => {
      res.status(402).sendWrapped(err)
    })
  })
}
