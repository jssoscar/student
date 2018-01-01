/*
 * @Author			jssoscar
 * @Date			2017-12-31 22:11:13 
 * @Version			1.0 
 * @Description	
 */

 const Mock = require('mockjs')

 module.exports = {
    'errno' : 0,
    data : {
        'username' : Mock.Random.cname(),
        'account|6-20' : '',
        'userType|1' : 1,
        email : '@EMAIL'
    },
    msg : ''
 };
