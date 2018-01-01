/*
 * @Author			jishengsheng
 * @Date			2018-01-01 01:31:40 
 * @Version			1.0 
 * @Description	
 */

import React,{Component} from 'react'
import {Form, Row, Col, Modal, message, Input, Select} from 'antd'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {post} from 'src/net'

const FormItem = Form.Item;

const {Option} = Select;

@observer
class AddOrEdit extends Component{

    @observable confirmLoading = false;

    @action confirm = () => {
        const {props} = this;

        props.form.validateFieldsAndScroll((error, values) => {
            if(error){
                return;
            }

            this.confirmLoading = true;

            post('/teacher/student/add', {
                ...props.data,
                ...values
            }).then(() => {
                message.success('学生添加成功！');
                this.cancel(true);
            }, () => {
                this.confirmLoading = false;
            });
        });
    }

    @action cancel = (refresh = false) => {
        this.confirmLoading = false;
        this.props.close(refresh);
    }

    render() {
        const {props} = this,
            {form, data} = props,
            {getFieldDecorator} = form,
            formItemProps = {
                labelCol: {
                    xs: {
                        span: 4
                    }
                },
                wrapperCol: {
                    xs: {
                        span: 20
                    }
                }
            },
            getRules = (selectable = false) => {
                return [
                    {
                        required : true, 
                        message : selectable ? '请选择' : '请输入'
                    }
                ];
            };

        return <Modal
            visible
            title="新增人员"
            onOk={this.confirm}
            confirmLoading={this.confirmLoading}
            onCancel={this.cancel}>
            <Form>
                <Row>
                    <Col>
                        <FormItem label="姓名" {...formItemProps}>
                            {
                                getFieldDecorator('name', {
                                    initialValue : data.name,
                                    rules : getRules()
                                })(<Input placeholder="姓名" />)
                            }
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label="学号" {...formItemProps}>
                            {
                                getFieldDecorator('id', {
                                    initialValue : data.id,
                                    rules : getRules()
                                })(<Input placeholder="学号" />)
                            }
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label="性别" {...formItemProps}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue : `${data.sex || ''}`,
                                    rules : getRules(true)
                                })(<Select style={{width: '100%'}}>
                                    <Option value="">请选择</Option>
                                    <Option value="男">男</Option>
                                    <Option value="女">女</Option>
                                </Select>)
                            }
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label="专业" {...formItemProps}>
                            {
                                getFieldDecorator('major', {
                                    initialValue : data.major,
                                    rules : getRules()
                                })(<Input placeholder="专业" />)
                            }
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label="手机号" {...formItemProps}>
                            {
                                getFieldDecorator('phone', {
                                    initialValue : data.phone,
                                    rules : getRules()
                                })(<Input placeholder="手机号" />)
                            }
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    }
}

export default Form.create()(AddOrEdit);