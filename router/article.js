const express = require('express')
const article = require('../middleware/article')
const category = require('../middleware/category')
const auth = require('../middleware/auth')

const articleApp = express()

articleApp.use(auth.getUser)

// 文章列表页
articleApp.get('/list/:id', [article.getListByCategoryId, category.getList, category.getCategoryById], (req, res) => {
	//  从中间件获取数据
    let {articles, categories, category, user} = req
    res.render('list', {articles: articles, categories: categories, category: category, user: user})
})

// 文章详情页
articleApp.get('/:id',[article.getArticleById, category.getList, article.getTabs, article.getPrevArticle, article.getNextArticle], (req, res) => {
	let { categories, article, tabs, prev, next, user } = req
	res.render('article', {categories: categories, article: article, tabs: tabs, prev: prev, next: next, user: user})
})

module.exports = articleApp