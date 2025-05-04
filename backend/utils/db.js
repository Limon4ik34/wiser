import mysql from 'mysql2'
import md5 from 'md5'


const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "blog",
  password: "цщщл1812"
});

export default {
  connect() {
    connection.connect((err) => {
      if (err) {
        console.log('Ошибка ДБ', err)
      } else {
        console.log('Подключение успешно установленно')
      }
    })
  },

  async createUser(newUser) {
    let res = new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO users (nik, login, password) VALUES('${newUser.nik}',
            '${newUser.login}', '${md5(newUser.password)}')
            `
      connection.query(sql, function (err, results) {
        if (err) {
          reject(err)
        } else {
          console.log(results);
          resolve(results)
        }
      });
    })
    return res
  },
  async getUser(user) {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE login='${user.login}' AND password='${md5(user.password)}'`;
      connection.query(sql, function (err, results) {
        console.log(results);
        if (err || !results[0]) {
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async createArticle(article) {
    article.dateCreate = Date.now()
    let res = new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO artiles (title, description, text, previewImage, authorId, dateCreate) VALUES('${article.title}',
            '${article.description}','${article.text}','${article.previewImage}','${article.authorId}','${article.dateCreate}')
            `
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          reject(err)
        } else {
          console.log(results);
          resolve(results)
        }
      });
    })
    return res
  },
  async getMyArticle(authorId) {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM artiles WHERE authorId='${authorId}'`;
      connection.query(sql, function (err, results) {
        if (err || !results[0]) {
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async getArticle(id) {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM artiles WHERE id='${id}'`;
      connection.query(sql, function (err, results) {
        if (err || !results[0]) {
          console.log('reject')
          reject(err)
        } else {
          resolve(results[0])
          console.log('resolve')
        }
      });
    })
    return res
  },
  async getArticleFull(id) {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM artiles WHERE id='${id}'`;
      connection.query(sql, (err, results) => {
        if (err || !results[0]) {
          console.log('reject')
          reject(err)
        } else {
          this.getUserById(results[0].authorId).then((user) => {
            delete user.password
            delete user.about
            delete user.login
            results[0].author = user;
            resolve(results[0])
          })
          console.log('resolve')
        }
      });
    })
    return res
  },

  async getUserById(id) {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE id='${id}'`;
      connection.query(sql, function (err, results) {
        if (err || !results[0]) {
          console.log('reject')
          reject(err)
        } else {
          resolve(results[0])
          console.log('resolve')
        }
      });
    })
    return res
  },


  async createOrder(orderData, user) {
    let res = new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO orders (userId, cardNumber, cardDate, cvv, contacts) VALUES('${user.id}',
            '${orderData.cardNumber}', '${orderData.cardDate}', '${orderData.cvv}', '${orderData.contacts}')
            `
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err)
        } else {
          const newOrderId = results.insertId
          this.getCart(user.id).then((cart) => {

            cart.forEach((product) => {
              const sql2 = `
            INSERT INTO order_products (productId, orderId, title, oldPrice, currentPrice, description, slug, qty) VALUES('${product.id}',
            '${newOrderId}', '${product.title}', '${product.oldPrice}', '${product.currentPrice}', '${product.description}', '${product.slug}', '${product.qty}')
            `
              connection.query(sql2, function (err, results) {
                console.log(err)
              })
            })
            setTimeout(() => {
              const sqlClearUserCart = `DELETE FROM carts WHERE userId=${user.id}`;
              connection.query(sqlClearUserCart, function (err, results) {
              })
            }, 2000)
            resolve(true)
          })
        }
      });
    })
    return res
  },
  async getOrders() {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM orders`;
      connection.query(sql, (err, orders) => {
        if (err) {
          reject(err)
        } else {
          orders.forEach(order => {
            const sqlProducts = `SELECT * FROM order_products WHERE orderId=${order.id}`
            connection.query(sqlProducts, (err, products) => {
              order.products = products
            })
            this.getUserById(order.userId).then(user => {
              delete user.password
              order.user = user
            })
          })
          setTimeout(() => {
            resolve(orders)
          }, 300)
          // const newOrderId = results.insertId

        }
      });
    })
    return res
  },
  async changeOrderStatus(id, status) {
    let res = new Promise((resolve, reject) => {
      const sql = `UPDATE orders SET status = '${status}' WHERE id=${id}`;
      connection.query(sql, (err, orders) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      });
    })
    return res
  },

  async geAllUsers() {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users`;
      connection.query(sql, function (err, results) {
        if (err || !results[0]) {
          console.log('reject')
          reject(err)
        } else {
          results.forEach(item => {
            delete item.password
          })
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async isUserAdmin(id) {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE id='${id}'`;
      connection.query(sql, function (err, results) {
        if (err || !results[0] || results[0].role !== 'admin') {
          console.log('reject')
          reject(err)
        } else {
          resolve(results[0])
          console.log('resolve')
        }
      });
    })
    return res
  },
  async updateUserRole(user) {
    console.log(user)
    let res = new Promise((resolve, reject) => {
      const sql = `UPDATE users SET role='${user.role}' WHERE id=${user.id}`;
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('reject')
          reject(err)
        } else {
          resolve(true)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async createCategory(newCategory) {
    let res = new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO categories (title, slug)
             VALUES('${newCategory.title}', '${newCategory.slug}')
            `
      connection.query(sql, function (err, results) {
        if (err) {
          reject(err)
        } else {
          console.log(results);
          resolve(results)
        }
      });
    })
    return res
  },
  async getCategories() {
    let res = new Promise((resolve, reject) => {
      let sql = `SELECT * FROM categories`;
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async updateCategory(category) {
    let res = new Promise((resolve, reject) => {
      const sql = `UPDATE categories SET title='${category.title}', slug='${category.slug}' WHERE id=${category.id}`;
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async deleteCategory(id) {
    let res = new Promise((resolve, reject) => {
      const sql = `DELETE FROM categories WHERE id=${id}`;
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async saveProductImage(image) {
    let res = new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO product_images (name, productId) 
            VALUES('${image.name}', ${image.productId})
            `
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async createProduct(image) {
    let res = new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO products (title, category, oldPrice, currentPrice, description, slug) 
            VALUES('${image.title}', '${image.category}', ${image.oldPrice}, ${image.currentPrice},'${image.description}','${image.slug}')
            `
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async getProducts() {
    let res = new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM products'
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async getProductById(id) {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM products WHERE id=${id}`
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          console.log('resolve')
          const sql2 = `SELECT * FROM product_images WHERE productId=${id}`
          connection.query(sql2, function (err, images) {
            results[0].images = []

            images.forEach((img) => {
              results[0].images.push(`http://localhost:5000/${img.name}`)
            })
            resolve(results[0])
          })
        }
      });
    })
    return res
  },
  async updateProduct(product) {
    let res = new Promise((resolve, reject) => {
      const sql = `UPDATE products SET title='${product.title}', category='${product.category}', oldPrice=${product.oldPrice}, currentPrice=${product.currentPrice}, description='${product.description}', slug='${product.slug}'
      WHERE id=${product.id}`;
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          console.log('resolve')
          resolve(results)
        }
      });
    })
    return res
  },
  async updateProductImages(dbData) {
    let res = new Promise((resolve, reject) => {
      const sql = `DELETE FROM product_images WHERE productId=${dbData.id}`;
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          reject(err)
        } else {
          dbData.images.forEach(img => {
            const sql2 = `
            INSERT INTO product_images (name, productId) 
            VALUES('${img}', ${dbData.id})
            `
            connection.query(sql2, function (err, results) {

            })

          })
          resolve(results)
        }
      });
    })
    return res
  },
  async deleteProduct(id) {
    let res = new Promise((resolve, reject) => {
      // Сначала удаляем изображения товара
      const sqlDeleteImages = `DELETE FROM product_images WHERE productId=${id}`;
      connection.query(sqlDeleteImages, function (err) {
        if (err) {
          console.log('Ошибка при удалении изображений', err);
          reject(err);
        } else {
          // Если изображения успешно удалены, удаляем сам товар
          const sqlDeleteProduct = `DELETE FROM products WHERE id=${id}`;
          connection.query(sqlDeleteProduct, function (err, results) {
            if (err) {
              console.log('Ошибка при удалении товара', err);
              reject(err);
            } else {
              resolve(results);
              console.log('Товар и его изображения успешно удалены');
            }
          });
        }
      });
    });
    return res;
  },

  async getProductsCategory(categoryId) {
    let res = new Promise((resolve, reject) => {

      const sqlCategory = `SELECT * FROM categories WHERE slug='${categoryId}'`;
      connection.query(sqlCategory, function (err, cat) {
        console.log('cat', cat)
        const catId = cat[0].id
        const sql = `SELECT * FROM products WHERE category='${catId}'`;
        connection.query(sql, function (err2, results) {
          if (err) {
            console.log('err', err)
            reject(err)
          } else {
            results.forEach((item) => {
              console.log('here')
              const sql2 = `SELECT * FROM product_images WHERE productId='${item.id}'`
              connection.query(sql2, function (err3, img) {
                item.images = img
              })
            })
            setTimeout(() => {
              resolve(results)
            }, 100)
          }
        })
      });
    })
    return res
  },
  async getProductBySlug(slug) {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM products WHERE slug='${slug}'`;
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          reject(err)
        } else {
          console.log(results)
          const sql2 = `SELECT * FROM product_images WHERE productId='${results[0].id}'`
          connection.query(sql2, function (err3, img) {
            results[0].images = []
            img.forEach(item => {
              results[0].images.push(`http://localhost:5000/${item.name}`)
            })
            resolve(results[0])
          })
        }
      })
    })
    return res
  },
  async getProductsFull() {
    let res = new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM products'
      connection.query(sql, function (err, results) {
        if (err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          results.forEach((item) => {
            console.log('here')
            const sql2 = `SELECT * FROM product_images WHERE productId='${item.id}'`
            connection.query(sql2, function (err3, img) {
              item.images = img
            })
          })
          setTimeout(() => {
            resolve(results)
          }, 100)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async changeCart({userId, productId, qty}) {
    let res = new Promise((resolve, reject) => {
      if (parseInt(qty) <= 0) {
        const sqlDel = `DELETE FROM carts WHERE userId='${userId}' AND productId='${productId}'`
        connection.query(sqlDel, function (err, r) {
          resolve(true)
        })
      } else {
        const sqlTemp = `SELECT * FROM carts WHERE userId='${userId}' AND productId='${productId}'`
        connection.query(sqlTemp, function (err, res) {
          if (res.length) {
            const updateSql = `UPDATE carts SET qty=${qty} WHERE id=${res[0].id}`
            connection.query(updateSql, function (err, r) {
              resolve(true)
            })
          } else {
            const sqlInsert = `
            INSERT INTO carts (userId, productId, qty) VALUES('${userId}',
            '${productId}', '${qty}')
            `
            connection.query(sqlInsert, function (err, r) {
              resolve(true)
            })
          }
        })
      }
    })
    return res
  },
  async getCart(userId) {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM carts WHERE userId = '${userId}'`
      connection.query(sql, function (err, results) {
        if (err) {
          reject(err)
        } else {
          const cart = []
          results.forEach((item) => {
            const sql2 = `SELECT * FROM products WHERE id='${item.productId}'`
            connection.query(sql2, function (err3, product) {
              const sql3 = `SELECT * FROM product_images WHERE productId='${product[0].id}'`
              connection.query(sql3, function (err, img) {
                product[0].images = []
                product[0].qty = item.qty
                img.forEach((i) => {
                  product[0].images.push(`http://localhost:5000/${i.name}`)
                })
                cart.push(product[0])
              })
            })
          })
          setTimeout(() => {
            resolve(cart)
          }, 300)
        }
      });
    })
    return res
  },

}