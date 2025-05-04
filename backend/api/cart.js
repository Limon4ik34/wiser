import {
  getQueryParams,
  saveData,
  readData
} from '../utils/utils.js'
const users = './json/users.json'
const carts = './json/carts.json'
const products = './json/products.json'
import db from '../utils/db.js'
import pkg from 'jsonwebtoken';


export default function (server) {
  server.post('/cart', async (query, res) => {
    const body = query.body
    const user = pkg.verify(query.headers.authorization, 'shhhhh')
    const reqData = {
      userId: user.id,
      productId: body.id,
      qty: body.qty
    }
    db.changeCart(reqData).then((action) => {
      db.getCart(user.id).then((response) => {
        res.status(200).sendWrapped({ products: response })
      })
    })
  })
  server.get('/cart', async (query, res) => {
    const user = pkg.verify(query.headers.authorization, 'shhhhh')
    db.getCart(user.id).then((response) => {
      res.status(200).sendWrapped({ products: response })
    })
  })
}
