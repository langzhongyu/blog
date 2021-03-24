const express = require('express')
const User = require('../model/user')
const log = require('../middleware/log')

const loginApp = express()

loginApp.get('/', (req, res)=>{
	res.render('login', {msg:''})
})

// 实现登录
loginApp.post('/', (req, res, next) => {
	let {username,password} = req.body
	User.login(username,password).then(result=>{
		if(result){
			req.log = {
				time: new Date(),
				handle: '登录',
				ip:req.ip.split(':')[3]
			}
			log.add(req, res, next)
			// session存储
			req.session.user = result
			res.redirect('/')
		}else{
			res.render('login', {msg:'登录失败！用户名或者密码错误！'})
		}
		
	}).catch(err=>{
		next(err)
	})
})


module.exports = loginApp