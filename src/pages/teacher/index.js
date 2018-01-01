/*
 * @Author			jssoscar
 * @Date			2017-12-31 23:48:19 
 * @Version			1.0 
 * @Description	
 */

import React from 'react'
import {Form, Row, Col, Input, Button, Table, Spin, Select, message, Modal} from 'antd'
import {addKey, getPagination} from './util'
import {observable, action, transaction} from 'mobx'
import {observer, inject} from 'mobx-react'
import {get, post} from 'src/net'
import AddOrEdit from './AddOrEdit';

const FormItem = Form.Item;

const {Option} = Select;

@inject('userStore')
@observer
class Teacher extends React.Component{

    @observable page = {
        current : 1,
        pageSize : 15
    };

    @observable pageLoading = true;

    @observable listData = [];

    @observable totalCount = 0;

    @observable addOrEditVisible = false;

    @observable dealData = {};

    isAdd = true;

    componentWillMount() {
        this.query();
    }

    @action query = () => {
        this.page.current = 1;
        this.pageLoading = true;
        this.getDataList();
    }

    getDataList = () => {
        get('/teacher/query', this.props.form.getFieldsValue())
            .then(result => {
                transaction(() => {
                    this.pageLoading = false
                    this.listData = result.data;
                    this.totalCount = result.total;
                });
            }, () => {
                this.pageLoading = false;
            });
    }

    @action addOrEdit = (data = {}, isAdd = true ) => {
        this.dealData = data;
        this.addOrEditVisible = true;
        this.isAdd = isAdd;
    }

    @action delStudent = data => {
        Modal.confirm({
            title : '提示',
            content : '确认删除？',
            onOk : () => {
                this.pageLoading = true;
                post('/teacher/student/del', data).then(() => {
                    message.success('学生删除成功!');
                    this.query();
                }, () => {
                    this.pageLoading = false;
                });
            }
        });
    }

    reset = () => {
        this.props.form.resetFields();
        this.query();
    }

    @action addOrEditClose = refresh => {
        this.addOrEditVisible = false;
        refresh === true && this.getDataList();
    }

    render() {
        const {props} = this,
            {form} = props,
            {getFieldDecorator} = form,
            formItemProps = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 6 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 18 }
                }
            };
        
        const pagination = getPagination(this.page);

        const columns = [
            {
                title : '学号',
                dataIndex : 'id'
            },
            {
                title : '姓名',
                dataIndex : 'name'
            },
            {
                title : '性别',
                dataIndex : 'sex'
            },
            {
                title : '专业',
                dataIndex : 'major'
            },
            {
                title : '手机号',
                dataIndex : 'phone'
            },
            {
                title : '创建时间',
                dataIndex : 'createTime'
            },
            {
                title : '操作',
                fixed: 'right',
                width: 190,
                render: (val, data) => {
                    return <div>
                        <Button className="mr-20" size="small" type="primary" icon="edit" onClick={() => this.addOrEdit(data, false)}>编辑</Button>
                        <Button size="small" type="danger" icon="delete" onClick={() => this.delStudent(data)}>删除</Button>
                    </div>
                }
            }
        ];

        return <div>
            <h3>学生管理</h3>
            <Spin spinning={this.pageLoading}>
                <Row>
                    <Col span={8}>
                        <FormItem label="学号" {...formItemProps}>
                        {
                            getFieldDecorator('id')(<Input placeholder="学号" />)
                        }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="姓名" {...formItemProps}>
                        {
                            getFieldDecorator('name')(<Input placeholder="姓名" />)
                        }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="专业" {...formItemProps}>
                        {
                            getFieldDecorator('major')(<Input placeholder="专业" />)
                        }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="性别" {...formItemProps}>
                        {
                            getFieldDecorator('sex', {
                                initialValue : ''
                            })(<Select style={{width: '100%'}}>
                                <Option value="">请选择</Option>
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>)
                        }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="手机号" {...formItemProps}>
                        {
                            getFieldDecorator('phone')(<Input placeholder="手机号" />)
                        }
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="end" className="mb-20">
                    <Col>
                        <Button className="mr-20" type="primary" icon="plus" onClick={() => this.addOrEdit()}>新增学生</Button>
                        <Button className="mr-20" type="primary" icon="search" onClick={this.query}>查询</Button>
                        <Button type="primary" onClick={this.reset}>清除</Button>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={addKey(this.listData)} bordered
                        onChange={this.tableChange} pagination={pagination} />
                {
                    this.addOrEditVisible && <AddOrEdit data={this.dealData} add={this.isAdd} close={refresh => this.addOrEditClose(refresh)}/>
                }
            </Spin>
        </div>
    }
}

export default Form.create()(Teacher);