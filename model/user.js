
module.exports = class User extends require('./model'){
	static login(username, password){
	    return new Promise((resolve, reject) => {
	        let sql ="SELECT id,username,password FROM `user` WHERE username = ? AND `password` = ?"
	        this.query(sql, [username, password]).then(results => {
	            resolve(results[0]) // 只获取其中一条
	        }).catch(err => {
	            console.log('登录失败：' + err.message)
	            reject(err)
	        })
	    })
	}
	// 最后一次登录时间
	static lastLoginTime(){
	    return new Promise((resolve, reject) => {
	        let sql ="SELECT `time` FROM `log` WHERE handle = '登录' ORDER BY `time` DESC LIMIT 1"
	        this.query(sql).then(results => {
	            resolve(results[0].time) // 只获取其中一条
	        }).catch(err => {
	            console.log('最后一次登录时间获取失败：' + err.message)
	            reject(err)
	        })
	    })
	}
}