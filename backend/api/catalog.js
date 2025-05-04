import {
  getQueryParams,
  readData
} from '../utils/utils.js'
import db from '../utils/db.js'
const file = './json/categories.json'
export default function (server) {
  server.get('/catalog', async (query, res) => {
    const { category } = getQueryParams(query.query)
    let data = readData(file)
    data = data[category]
    res.sendWrapped({ ...data })
  })
  server.get('/catalog/categories', async (query, res) => {
    db.getCategories().then((result) => {
      res.sendWrapped(result)
    }).catch((err) => {
      res.status(402).sendWrapped(err)
    })
  })
  server.get('/catalog/categories/:id', async (query, res) => {
    db.getProductsCategory( query.params.id).then((result) => {
      res.sendWrapped({products:result})
    }).catch((err) => {
      res.status(402).sendWrapped(err)
    })
  })
}
