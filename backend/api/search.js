import {
  getQueryParams,
} from '../utils/utils.js'
import db from "../utils/db.js";

export default function (server) {
  server.get('/search', async (query, res) => {
    const { queryText } = getQueryParams(query.query)
    let result = []
    db.getProductsFull().then((products)=> {
      products.forEach(item => {
        console.log(item)
        if(item.title.toLowerCase().trim().includes(queryText.toLowerCase().trim())){
          result.push(item)
        }
      })
      res. sendWrapped({ result })
    })
  })
}
