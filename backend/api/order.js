import {
  getQueryParams,
  saveData,
  readData
} from '../utils/utils.js'
import pkg from 'jsonwebtoken';
import db from '../utils/db.js'

export default function (server) {
  server.post('/orders', async (query, res) => {
    const user = pkg.verify(query.headers.authorization, 'shhhhh')
    const order = query.body
    db.createOrder(order, user).then((userData) => {
      delete userData.password
      res.status(200).sendWrapped(userData)
    }).catch((err) => {
      res.status(404).sendWrapped({})
    })
  })
  server.get('/orders', async (query, res) => {
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          db.getOrders().then((orders) => {
            res.status(200).sendWrapped(orders)
          }).catch((err) => {
            res.status(404).sendWrapped({})
          })
        } else {
          res.status(403).sendWrapped({})
        }
      })
    } else {
      res.status(403).sendWrapped({})
    }
  })
  server.patch('/orders', async (query, res) => {
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          const order = query.body
          db.changeOrderStatus(order.id, order.status).then((orders) => {
            res.status(200).sendWrapped(orders)
          }).catch((err) => {
            res.status(404).sendWrapped({})
          })
        } else {
          res.status(403).sendWrapped({})
        }
      })
    } else {
      res.status(403).sendWrapped({})
    }
  })
}
