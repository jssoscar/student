/*
 * @Author			jssoscar
 * @Date			2017-12-31 22:11:13 
 * @Version			1.0 
 * @Description	
 */

const Mock = require('mockjs');

const login = require('./login');

const teacher = require('./teacher');

const student = require('./student');

const middleWare = (req, res, next) => {

    let url = req.url;

    if(/\./.test(url)){
        next();
        return;
    }

    res.setHeader('Content-Type', 'application/json');

    let result = {};
    
    if(/\/login/.test(url)){
        result = Mock.mock(login);
    }else if(/\/teacher/.test(url)){
        result = Mock.mock(teacher);
    }else if(/\/student/.test(url)){
        result = Mock.mock(student);
    }

    res.write(JSON.stringify(result));

    setTimeout(() => {
        res.end();
    }, 1000);
};

module.exports = {
    middleWare
};
