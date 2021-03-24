const express = require('express')
const article = require('../middleware/article')
const category = require('../middleware/category')
const auth = require('../middleware/auth')


const indexApp = express()

indexApp.use(auth.getUser)

indexApp.get('/', [article.getHot,article.getList, category.getList], (req, res)=>{
    let {hots, articles, categories, user} = req
    res.render('index', {hots:hots, articles:articles, categories:categories, user:user})
})


module.exports = indexApp