/**
 * 标签数据模块
 */
module.exports = class Tab extends require('./model'){
	static getTabs(id){
	    return new Promise((resolve, reject) => {
	        let sql ="SELECT id,`name` FROM tabs WHERE article_id = ? "
	        this.query(sql, id).then(results => {
	            resolve(results) // 只获取其中一条
	        }).catch(err => {
	            console.log(`获取指定文章标签数据失败：$(err.message}`)
	            reject(err)
	        })
	    })
	}
}