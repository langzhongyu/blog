/**
 * 标签日志
 */
module.exports = class log extends require('./model'){
	/**
	 * 获取日志列表
	 */
	static getPage(start,size){
	    return new Promise((resolve, reject) => {
	        let sql ='SELECT handle,`time`,ip FROM `log` ORDER BY `time` DESC LIMIT ?,?'
	        this.query(sql,[start, size]).then(results => {
	            resolve(results)
	        }).catch(err => {
	            console.log(`获取日志列表失败：$(err.message}`)
	            reject(err)
	        })
	    })
	}
	/**
	 * 获取日志总条目数
	 */
	static getCount(){
	    return new Promise((resolve, reject) => {
	        let sql ="SELECT COUNT(1) as count FROM `log`"
	        this.query(sql).then(results => {
	            resolve(results[0].count)
	        }).catch(err => {
	            console.log(`获取日志总条目数失败：$(err.message}`)
	            reject(err)
	        })
	    })
	}
	/**
	 * 添加日志
	 */
	static add(log){
	    return new Promise((resolve, reject) => {
	        let sql ="INSERT INTO `log` SET ?"
	        this.query(sql, log).then(results => {
	            resolve(results.affectedRows)
	        }).catch(err => {
	            console.log(`获取日志总条目数失败：$(err.message}`)
	            reject(err)
	        })
	    })
	}
}
