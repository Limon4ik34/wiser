import {
  getQueryParams,
  saveData,
  readData
} from '../utils/utils.js'
import pkg from 'jsonwebtoken';
import db from '../utils/db.js'

export default function (server) {
  server.get('/users', async (query, res) => {
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      console.log(user)
      console.log(user)
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          db.geAllUsers().then((users) => {
            res.status(200).sendWrapped(users)
          }).catch((err) => {
            res.status(405).sendWrapped({})
          })
        } else {
          res.status(403).sendWrapped({})
        }
      }).catch((err) => {
        res.status(404).sendWrapped({})
      })
    } else {
      res.status(403).sendWrapped({})
    }
  })
  server.patch('/users', async (query, res) => {
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      const body = query.body
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          db.updateUserRole(body).then((users) => {
            res.status(200).sendWrapped(users)
          }).catch((err) => {
            res.status(405).sendWrapped({})
          })
        } else {
          res.status(403).sendWrapped({})
        }
      }).catch((err) => {
        res.status(404).sendWrapped({})
      })
    } else {
      res.status(403).sendWrapped({})
    }
  })
}