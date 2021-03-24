/**
 * 后台首页
 */
const express = require('express')
const log = require('../../middleware/log')

const logApp = express()

// 加载首页
logApp.get('/',log.getCount, (req, res, next)=>{
	let page ={
		p:req.query.p ? req.query.p : 1,
		count: req.count,
		size: 3
	}
	page.total = Math.ceil(page.count / page.size)
	page.p = page.p > page.total ? page.total : page.p
	page.p = page.p < 1 ? 1 : page.p
	req.page = page
	next()
},log.getPage, (req, res)=>{
	let { user,page } = req
	res.render('admin/log/index', {user:user,page:page})
})


module.exports = logApp