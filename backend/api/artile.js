import {
  getQueryParams,
  saveData,
  readData
} from '../utils/utils.js'
import pkg from 'jsonwebtoken'
import fs from 'fs'
import db from '../utils/db.js'
import { staticHost } from '../index.js'

export default function(server) {
  server.post('/article', async (query, res) => {
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      const body = query.body
      body.authorId = user.id
      db.createArticle(body).then((article) => {
        res.status(201).sendWrapped(article)
      }).catch((err) => {
        res.status(402).sendWrapped({
          err
        })
      })
    } else {
      res.status(403).sendWrapped({})
    }
  })
  server.get('/article/:id', async (query, res) => {
    console.log('here')
    db.getArticle(+query.params.id).then((articles) => {
      res.status(200).sendWrapped(articles)
    }).catch((err) => {
      res.status(402).sendWrapped({
        err
      })
    })

  })
  server.patch('/article', async (query, res) => {
    const body = query.body
    db.updateArticle(body).then((articles) => {
      res.status(200).sendWrapped(articles)
    }).catch((err) => {
      res.status(402).sendWrapped({
        err
      })
    })
  })
  server.post('/article-list', async (query, res) => {
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      const body = query.body
      if (body.status === 'all') {
        db.getAllArticle().then((article) => {
          res.status(201).sendWrapped(article)
        }).catch((err) => {
          res.status(402).sendWrapped({
            err
          })
        })
      } else {
        db.getArticleStatus(body.status).then((article) => {
          res.status(201).sendWrapped(article)
        }).catch((err) => {
          res.status(402).sendWrapped({
            err
          })
        })
      }
    } else {
      res.status(403).sendWrapped({})
    }
  })
  server.post('/article-set-status', async (query, res) => {
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      const body = query.body
      db.setArticleStatus(body.id, body.status).then((article) => {
        res.status(201).sendWrapped(article)
      }).catch((err) => {
        res.status(402).sendWrapped({
          err
        })
      })
    } else {
      res.status(403).sendWrapped({})
    }
  })
  server.post('/article/review', async (query, res) => {
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      const body = query.body
      body.userId = user.id
      db.addReview(body).then((article) => {
        res.status(201).sendWrapped(article)
      }).catch((err) => {
        res.status(402).sendWrapped({
          err
        })
      })
    } else {
      res.status(403).sendWrapped({})
    }
  })
  server.get('/my-articles', async (query, res) => {
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      db.getMyArticle(+user.id).then((articles) => {
        res.status(200).sendWrapped(articles)
      }).catch((err) => {
        res.status(402).sendWrapped({
          err
        })
      })
    } else {
      res.status(403).sendWrapped({})
    }
  })
  server.get('/articles/popular', async (query, res) => {
    const { theme } = getQueryParams(query.query)
    db.getPopularArticles(theme).then((articles) => {
      res.status(200).sendWrapped(articles)
    }).catch((err) => {
      res.status(402).sendWrapped({
        err
      })
    })

  })
  server.get('/article-full/:id', async (query, res) => {
    let userId = null
    if (query.headers.authorization) {
      const user = pkg.verify(query.headers.authorization, 'shhhhh')
      console.log('user', user)
      userId = user.id
    }
    db.getArticleFull(+query.params.id, +userId).then((article) => {
      res.status(200).sendWrapped(article)
    }).catch((err) => {
      res.status(402).sendWrapped({
        err
      })
    })

  })

  server.post('/upload-image', async (query, res) => {
    if (query.headers.authorization) {
      const file = query.files['image']
      let fileName = `${Date.now()}-${file.name}`
      fileName = fileName.replace(' ', '')
      file.mv(`./static/${fileName}`)
      res.status(201).sendWrapped({ image: staticHost + fileName })
    } else {
      res.status(403).sendWrapped({})
    }
  })
  server.post('/upload-image-editor', async (query, res) => {
    if (query.headers.authorization) {
      const file = query.files['upload']
      let fileName = `${Date.now()}-${file.name}`
      fileName = fileName.replace(' ', '')
      file.mv(`./static/${fileName}`)
      res.status(201).sendWrappedNew({ url: staticHost + fileName })
    } else {
      res.status(403).sendWrapped({})
    }
  })
}
