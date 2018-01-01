/*
 * @Author			jssoscar
 * @Date			2018-01-01 02:14:39 
 * @Version			1.0 
 * @Description	
 */

import React, {Component} from 'react'
import {Form, Row, Col, Card, Table} from 'antd'
import {get} from 'src/net'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import {addKey} from '../teacher/util'

const FormItem = Form.Item;

@observer
class MyProfile extends Component{

    @observable info = {};

    @observable logData = [];

    componentWillMount() {
        this.getInfo();
    }

    @action getInfo = () => {
        get('/student/my').then( ({data}) => {
            this.logData = data.log;
            this.info = data;
        });
    }

    render() {
        const info = {...this.info};
        const formItemProps = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 6 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 18 }
                }
            };
        
        const columns = [
            {
                title : '时间',
                dataIndex : 'time'
            },
            {
                title : '描述',
                dataIndex : 'description'
            }
        ]
        
        return <div>
            <h3>个人中心</h3>
            <Card bordered={false} title="基本信息">
                <Row>
                    {
                        [{
                            key : 'name',
                            title : '姓名'
                        }, {
                            key : 'id',
                            title : '学号'
                        },{
                            key : 'sex',
                            title : '性别'
                        }, {
                            key : 'phone',
                            title : '手机号'
                        }, {
                            key : 'major',
                            title : '专业'
                        }, {
                            key : 'province',
                            title : '省份'
                        },{
                            key : 'city',
                            title : '城市'
                        },{
                            key : 'createTime',
                            title : '创建时间'
                        }].map(({key, title}, index) => {
                            return <Col span={8} key={index}>
                                <FormItem label={title} {...formItemProps}>
                                    {info[key] || '-'}
                                </FormItem>
                            </Col>
                        })
                    }
                </Row>
            </Card>
            <Card bordered={false} title="账号日志">
                <Table columns={columns} pagination={false} dataSource={addKey(this.logData)} />
            </Card>
        </div>
    }
}

export default MyProfile;
