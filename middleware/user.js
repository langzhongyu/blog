/**
 * 用户中间件
 * */
 const User = require('../model/user')
 
 module.exports = {
	 // 获取最后一次登录时间
	 lastLoginTime:(req, res, next)=>{
		 User.lastLoginTime().then(results =>{
			 req.lastLoginTime = results
			 next() // next()确保中间件被一个一个执行
		 }).catch(err => {
			 next(err)
		 })
	 }
 }
 