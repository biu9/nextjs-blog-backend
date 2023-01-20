const { application } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql');
const bp = require('body-parser');
const url = require('url');
const fs = require('fs');

const config = require('./config.json');

const blog = require('./src/blog/blog');
const types = require('./src/types/types');
const user = require('./src/user/user');

const port = 1234;
process.env.port = port;

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

const connection = mysql.createConnection({
    host: config.host,
    user:config.user,
    port:config.port,
    password:config.password,
    database:config.database
});

connection.connect();
setInterval(()=>{
    const sql = 'select * from blogContent ORDER BY `id` DESC LIMIT 8 OFFSET 0';
    connection.query(sql);
},1000*60*30);

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/api/blog',blog);
app.use('/api/types',types);
app.use('/api/user',user);

app.listen(port, () => {
    console.log(`[Test Server] Server running at http://127.0.0.1:${port}`);
});