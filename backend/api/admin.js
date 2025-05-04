import {
  getQueryParams,
  saveData,
  readData
} from '../utils/utils.js'
import pkg from 'jsonwebtoken';
import fs from 'fs'
import db from '../utils/db.js'

export default function (server) {
  server.post('/admin/categories', async (query, res) => {
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          const body = query.body
          db.createCategory(body).then((cat) => {
            console.log('insertId', cat.insertId)
            res.status(201).sendWrapped({data: 'ok'})
          }).catch((err) => {
            res.status(404).sendWrapped({
              err
            })
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
  server.patch('/admin/categories/:categoryId', async (query, res) => {
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          const body = query.body
          db.updateCategory(body).then(() => {
            res.status(201).sendWrapped({data: 'ok'})
          }).catch((err) => {
            res.status(402).sendWrapped({
              err
            })
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
  server.delete('/admin/categories/:categoryId', async (query, res) => {

    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          db.deleteCategory(query.params.categoryId).then(() => {
            res.status(201).sendWrapped({data: 'ok'})
          }).catch((err) => {
            res.status(402).sendWrapped({
              err
            })
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
  server.delete('/admin/products/:id', async (query, res) => {

    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          db.deleteProduct(query.params.id).then(() => {
            res.status(201).sendWrapped({data: 'ok'})
          }).catch((err) => {
            res.status(402).sendWrapped({
              err
            })
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
  server.post('/admin/products', async (query, res) => {

    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          const body = query.body
          const files = query.files['images[]']
          console.log('files', files)
          db.createProduct(body).then((product)=> {
            const productId = product.insertId
            if (files.length) {
              files.forEach(file => {
                const fileName = `${Date.now()}-${file.name}`
                file.mv(`./static/${fileName}`);
                db.saveProductImage({name: fileName, productId})
              })
            } else {
              const fileName = `${Date.now()}-${files.name}`
              files.mv(`./static/${fileName}`);
              db.saveProductImage({name: fileName, productId})
            }
            res.status(201).sendWrapped({data: 'ok'})
          }).catch((err) => {
            res.status(402).sendWrapped({
              err
            })
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
  server.get('/admin/products', async (query, res) => {

    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          db.getProducts().then((products)=> {
            res.status(201).sendWrapped({products})
          }).catch((err) => {
            res.status(402).sendWrapped({
              err
            })
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
  server.get('/admin/products/:id', async (query, res) => {

    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          db.getProductById(query.params.id).then((product)=> {
            res.status(201).sendWrapped({product})
          }).catch((err) => {
            res.status(402).sendWrapped({
              err
            })
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
  server.patch('/admin/products/:id', async (query, res) => {

    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      db.getUserById(user.id).then((userData) => {
        if (userData.role === 'admin') {
          const body = query.body
          const tempFiles = query.files
          if (tempFiles) {
            const files = tempFiles['images[]']
            const dbData = {
              id: body.id,
              images:[],
            }
            files.forEach(file => {
              const fileName = `${Date.now()}-${file.name}`
              file.mv(`./static/${fileName}`);
              dbData.images.push(fileName)
            })
            db.updateProductImages(dbData)
          }
          db.updateProduct(body).then((product)=> {
            res.status(201).sendWrapped({product})
          }).catch((err) => {
            res.status(402).sendWrapped({
              err
            })
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
