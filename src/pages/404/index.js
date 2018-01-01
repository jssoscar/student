/*
 * @Author			jishengsheng
 * @Date			2017-12-24 22:48:01 
 * @Version			1.0 
 * @Description	
 */

import React, {Component} from 'react'
import img from 'src/img/404.svg'
import {Button} from 'antd'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

@observer
class NotFound extends Component{

    @observable counter = 5;

    componentDidMount() {
        this.interval = setInterval(() => {
            this.counter ? this.counter-- : this.clearInterval();
        }, 1000);
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    clearInterval = () => {
        this.interval && clearInterval(this.interval);
        const {history} = this.props;
        history.replace('/');
    }

    render() {
        return <div className="exception">
            <div>
                <img src={img} alt="404" className="exception-404"/>
            </div>
            <div>
                <p className="exception-title">404</p>
                <div  className="exception-content">
                    <p>抱歉，你访问的页面不存在</p>
                    {
                        this.counter ? <p><span style={{color: 'red'}}>{this.counter}</span>秒后将跳转到首页</p> :
                            <p>页面跳转中，请稍候……</p>
                    }
                </div>
                <Button type="primary" onClick={this.clearInterval}>返回首页</Button>
            </div>
        </div>
    }
}

export default NotFound;