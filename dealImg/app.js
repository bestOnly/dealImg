
//node原生搭建服务器
/*
const http = require('http')
//通过内置模块的查询参数，将字符串改为对象形式
const qs = require('querystring');
const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  const obj = qs.parse(req.url.split('?')[1])
  
  console.log(obj)
  let {name, age} = obj
  res.end(`<h1>我的名字是${name},我的年龄${age}</h1>`)
})

server.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功')
  else console.log(err)
})

*/

const express = require('express')
const app = express()
const qs = require('querystring');

app.get('/', (req, res) => {
  res.send('我是主页')
})
app.get('/movies', (req, res) => {
  console.log(req.query);

  res.send(`我是电影页, 账户：${ req.query.username},密码：${req.query.password}`);
})
app.get('/getImg', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  const param = req.query
  console.log(param);
  res.send(`${JSON.stringify(param)}`)
})

app.post('/', (req, res) => {
  res.send('我是post请求噢')
})

app.listen(3000, (err) => {
  if(!err) console.log('服务器启动中...');
  else console.log(err)
})