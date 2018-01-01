/*
 * @Author			jssoscar
 * @Date			2017-12-23 00:02:32
 * @Version			1.0
 * @Description
 */

import React, {Component} from 'react'
import {Spin} from 'antd'

const asyncComponent = loadComponent => (class AsyncComponent extends Component {
    state = {
        Async: null,
        loading : false
    }

    componentWillMount() {
        if (this.componentLoaded()) {
            return;
        }

        this.setState({
            loading : true
        }, () => {
            loadComponent().then(({default : Async}) => {
                if(Async){
                    this.setState({
                        Async,
                        loading : false
                    });
                }
            }).catch((err) => {
                this.setState({
                    loading : false
                });
                console.error('组件加载失败！');
                throw err;
            });
        });
    }

    componentWillUnmount() {
        this.setState({Async: null});
    }

    componentLoaded = () => {
        return this.state.Async != null;
    }

    render() {
        const {state} = this;
        const {Async} = state;
        
        return Async
            ? <Spin spinning={state.loading} size="large">
                <Async {...this.props}/>
            </Spin>
            : null;
    }
});

export default asyncComponent;