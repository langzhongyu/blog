module.exports = class account extends require('./model'){
	static getInfo(){
	    return new Promise((resolve, reject) => {
	        let sql =''
	        this.query(sql).then(results => {
	            resolve(results[0].total)
	        }).catch(err => {
	            console.log(`访问量获取失败：$(err.message}`)
	            reject(err)
	        })
	    })
	}
}