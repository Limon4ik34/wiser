import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import catalogApi from './api/catalog.js'
import productsApi from './api/products.js'
import searchApi from './api/search.js'
import authApi from './api/auth.js'
import aiApi from './api/ai.js'
import cartApi from './api/cart.js'
import adminApi from './api/admin.js'
import usersApi from './api/users.js'
import ordersApi from './api/order.js'
import articleApi from './api/artile.js'
import db from './utils/db.js'
import 'dotenv/config'
export const staticHost = 'http://localhost:5000/'
export const aiKey = "chad-5943ceb434534573ae4f844ba95cc9d3fgj88afk"
export const aiApiUrl = "https://ask.chadgpt.ru/api/public/gpt-4o-mini"

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
  createParentPath: true,
}))
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('./static'))
express.response.sendWrapped = function (data) {
  return this.send({ data })
}

express.response.sendWrappedNew = function (data) {
  return this.send(data)
}

db.connect()

authApi(app)
aiApi(app)
articleApi(app)


const port = 5000
app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
