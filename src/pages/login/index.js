/*
 * @Author			jishengsheng
 * @Date			2017-12-23 23:08:12 
 * @Version			1.0 
 * @Description	
 */

import React, {Component} from 'react'
import {Form, Input, Button, Radio} from 'antd'
import {observer, inject} from 'mobx-react'
import {observable} from 'mobx'
import logo from '../../img/logo.svg';
import {post} from 'src/net'

const FormItem = Form.Item;

@inject('userStore')
@observer
class Login extends Component{

    @observable loading = false;

    submit = (e) => {
        e.preventDefault();
        
        const {props} = this;

        props.form.validateFields((err, values) => {
            if(err){
                return;
            }

            this.loading = true;

            post('/login', values).then(({data}) => {
                props.userStore.login({
                    ...data,
                    userType : values.type
                });

                this.loading = false;

                const { replace } = props.history;

                replace(values.type ? '/app/teacher' : '/app/student');
            }, () => {
                this.loading = false;
            });
        });
    }

    render() {
        const {props} = this,
            {getFieldDecorator} = props.form;

        return <div className="login-container">
            <header className="login-header">
                <img src={logo} className="login-logo" alt="logo" />
            </header>
            <div className="login-title">欢迎访问教务管理系统</div>
            <Form className="login-form" onSubmit={this.submit}>
                <FormItem>
                    {
                        getFieldDecorator('username', {
                            rules : [
                                {
                                    required : true,
                                    message : '请输入用户名'
                                }
                            ]
                        })(<Input placeholder="用户名" />)
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('password', {
                            rules : [
                                {
                                    required : true,
                                    message : '请输入密码'
                                }
                            ]
                        })(<Input placeholder="密码" type="password" />)
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('type', {
                            initialValue : 0
                        })(
                            <Radio.Group>
                              <Radio value={0}>学生</Radio>
                              <Radio value={1}>教师</Radio>
                            </Radio.Group>
                          )
                    }
                </FormItem>
                <Button style={{
                    width: '100%'
                }} loading={this.loading} type="primary" htmlType="submit">登录</Button>
            </Form>
        </div>
    }
}

export default Form.create()(Login);