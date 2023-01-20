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

router.post('/login',(req,res) => {
    const sql = `SELECT * FROM user WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;
    connection.query(sql,(err,result) => {
        if(err){
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

module.exports = router