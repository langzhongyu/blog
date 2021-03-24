/**
 * 后台首页
 */
const express = require('express')
const category = require('../../middleware/category')

const categoryApp = express()

// 加载首页
categoryApp.get('/',[category.getList], (req, res)=>{
	let { categories } = req
	res.render('admin/category/index', {user:req.user, categories:categories})
})
// 添加类目
categoryApp.post('/add', category.add, (req, res)=>{
	if(req.insertId){
		res.json({code: 1, msg: '添加成功'})
	}else{
		res.json({code: 0, msg: '添加失败'})
	}
})
//删除类目
categoryApp.get('/del', category.del, (req, res)=>{
	if(req.affectedRows > 0){
		res.json({code: 1, msg: '删除成功'})
	}else{
		res.json({code: 0, msg: '删除失败'})
	}
})

// 修改类目名称
categoryApp.post('/setname', category.setName,(req, res)=>{
	if(req.affectedRows > 0){
		res.json({code: 1, msg: '修改类目名称成功'})
	}else{
		res.json({code: 0, msg: '修改类目名称失败'})
	}
})

// 修改类目排序
categoryApp.post('/setindex', category.setIndex,(req, res)=>{
	if(req.affectedRows > 0){
		res.json({code: 1, msg: '修改类目排序成功'})
	}else{
		res.json({code: 0, msg: '修改类目排序失败'})
	}
})

module.exports = categoryApp