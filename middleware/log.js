/**
 * pv中间件
 * */
 const log = require('../model/log')
 module.exports = {
     /**
      * 获取日志列表
      */
	getPage:(req,res,next)=>{
		let {p, size}= req.page
		log.getPage((p-1)*size, size).then(results=>{
			req.page.list = results
			next()
		}).catch(err=>{
			next(err)
		})
	},
	// 获取日志总数
	getCount:(req,res,next)=>{
		log.getCount().then(results=>{
			req.count = results
			next()
		}).catch(err=>{
			next(err)
		})
	},
	// 添加日志
	add:(req,res,next)=>{
		log.add(req.log).then(results=>{
			req.count = results
			next()
		}).catch(err=>{
			next(err)
		})
	}
	
}