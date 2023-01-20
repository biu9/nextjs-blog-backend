const express = require('express')
const config = require('../../config.json')
const mysql = require('mysql')
const fs = require('fs')
const { json } = require('body-parser')
const bp = require('body-parser')

const router = express.Router()

router.use(bp.urlencoded({ extended: false }))
router.use(bp.json())

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  port: config.port,
  password: config.password,
  database: config.database,
})

const requestBlogType = {
  'recentPosts':1,
  'popularPosts':2,
}

router.post('/get', (req, res) => {
  // write to log
  const log = `get blog content at ${new Date().toLocaleString()}\r\n`
  fs.appendFileSync('./src/blog/log.txt', log)

  let sql;
  if(req.body.type === requestBlogType.recentPosts) {
    sql = 'select * from blogContent ORDER BY `id` DESC LIMIT 8 OFFSET 0';
  } else if(req.body.type === requestBlogType.popularPosts) {
    sql = 'select * from blogContent ORDER BY `readTimes` DESC LIMIT 3 OFFSET 0';
  }

  connection.query(sql, function (err, result) {
    if (err) {
      // write error
      const errorLog = `  error: ${err}\r\n`;
      fs.appendFileSync('./src/blog/log.txt', errorLog)

      res.end(
        JSON.stringify({
          message: err,
          data: {},
        }),
      )
    } else {
      res.end(
        JSON.stringify({
          message: 'success',
          data: result,
        }),
      )
    }
  })
})

router.post('/add', (req, res) => {
  res.send('add blog content')
})

router.post('/update', (req, res) => {
  res.send('update blog content')
})

router.post('/delete', (req, res) => {
  res.send('delete blog content')
})

module.exports = router
