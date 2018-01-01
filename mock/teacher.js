/*
 * @Author			jssoscar
 * @Date			2017-12-31 23:22:52 
 * @Version			1.0 
 * @Description	
 */

const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = {
    'errno' : 0,
    'data|1-10' : [{
        'id|+1' : Random.integer(2016100000, 2016109999),
        'name|+10' : Random.cname(),
        'sex|1' : ['男', '女'],
        'phone|+1' : Random.integer(13000000000, 18999999999),
        'major|1' : ['计算机科学与技术', '计算机应用', '传媒', '文学'],
        'createTime' : '@DATETIME'
    }],
    'total' : Random.integer(20, 1000),
    msg : ''
 };