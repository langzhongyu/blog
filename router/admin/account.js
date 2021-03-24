/**
 * 后台首页
 */
const express = require('express')
const article = require('../../middleware/article')

const accountApp = express()

// 加载首页
accountApp.get('/', (req, res)=>{
	res.render('admin/account/index', {user:req.user})
})
//编辑用户信息
accountApp.post('/', article.userInfo, (req, res)=>{
	if(req.affectedRows > 0){
		res.render('login', {msg:''})
	}else{
		res.render('admin/account', {code: false, msg: '用户信息修改失败'})
	}
})

module.exports = accountApp