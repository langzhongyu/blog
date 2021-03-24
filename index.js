const express = require('express')
const session = require('cookie-session')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const app = express()

// 上传图片配置
const upload = multer({
    dest: './static/upload', // 上传文件的存储目录
    limits: {
        fileSize: 1024*1024*2 // 单个文件大小限制在2M以内
    }
})

// 配置模板引擎
app.set('view engine', 'html')
//app.set('views', '${__dirname}/views')
// 引入绝对路径  __dirname 表示当前文件所在的目录的绝对路径
app.set('views',path.join(__dirname, 'views'))
// 使用ejs中renderFile渲染html模板
app.engine('html', require('ejs').renderFile)

//静态资源配置
app.use(express.static('static'))
// POST请求处理
app.use(express.urlencoded({extended:true}))

// session配置
app.use(session({
	keys: ['secret'],
	maxAge: 1000*60*30
}))

// session延期配置
app.use((req, res, next)=>{
	req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
	next()
})

app.use(/\/(index)?/, require('./router/index'))
app.use('/article', require('./router/article'))
// 调用搜索子应用
app.use('/search', require('./router/search'))
app.use('/login', require('./router/login'))

// 进入后台的权限验证(给所有后台页面加上验证)
app.use('/admin/?*', require('./middleware/auth').allowToAdmin)

// 上传操作 upload.single('upload')每次上传单个照片的配置信息
app.post('/admin/*', upload.single('upload'), (req, res, next) =>{
    // 上传成功后的文件对象
    let { file } = req
    if(file){
        let extname = path.extname(file.originalname) // 文件上传之前名称
        fs.renameSync(file.path, file.path + extname) // file.path 上传后的文件路径
        req.uploadUrl = '/upload/' + file.filename + extname // file.filename 上传后的文件名
    }
    next()
})

// 调用后台首页
app.use(/\/admin\/(index)?/, require('./router/admin/index'))
app.use('/admin/article', require('./router/admin/article'))
app.use('/admin/category', require('./router/admin/category'))
app.use('/admin/log', require('./router/admin/log'))
app.use('/admin/account', require('./router/admin/account'))

// 退出
app.get('/user/logout', (req, res) => {
    req.session.user = null
    res.render('login', { msg: '退出成功' })
})

app.listen('3006', function(){
    console.log('3006端口已启动~')
})