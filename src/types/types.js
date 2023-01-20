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

router.post('/get',(req,res) => {

    // write to log
    const log = `get blog content at ${new Date().toLocaleString()}\r\n`
    fs.appendFileSync('./src/types/log.txt', log)

    const sql = `SELECT * FROM types`;
    connection.query(sql,(err,result) => {
        if(err){
            // write error
            const errorLog = `  error: ${err}\r\n`;
            fs.appendFileSync('./src/types/log.txt', errorLog)

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

router.post('/add',(req,res) => {   
    
})

router.post('/update',(req,res) => {

})

module.exports = router