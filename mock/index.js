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

/**
 */
const request = require('request');

const argv = require('yargs').argv;

const isProxy = !!argv.proxy;

/**
 * 配置代理，有的时候接口不走本地mock会走代理
 * @param  {String} reqUrl
 * @param  {Object} res
 * @param  {Object} req
 * @return {null}
 */
const doProxy = (reqUrl, res, req, next) => {
    //https://www.npmjs.com/package/request
    let handleError = error => {
        if (!error) {
            return;
        }
        console.error(error);
        let errorText = error.message;
        res.statusMessage = errorText;
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.write(errorText);
        res.end();
        console.log(reqUrl, '--------------------error-----------------------');
    };
    var iReq = request(reqUrl);
    req.pipe(iReq)
    iReq.pipe(res);
    iReq.on('error', handleError);
    // next();
};

const middleWare = (req, res, next) => {
    let url = req.url;

    if(/\./.test(url)){
        next();
        return;
    }

    if(isProxy){
        const reqUrl = `http://${argv.proxy.replace('http://', '').replace(/\/$/, '')}${url}`;
        doProxy(reqUrl, res, req, next);
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
