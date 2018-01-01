/*
 * @Author			jishengsheng
 * @Date			2017-12-29 18:14:21 
 * @Version			1.0 
 * @Description	
 */

import React from 'react'
import {Menu, Layout} from 'antd';

import {observable} from 'mobx'
import {observer} from 'mobx-react'

const {SubMenu, Item : MenuItem} = Menu;
const {Sider} = Layout;

@observer
class AccountMenu extends React.Component {

    @observable openKeys = ['my'];

    onOpenChange = (openKeys) => {
        this.openKeys = openKeys;
    }

    render() {
        const {props} = this,
            {userStore} = props;

        const currentPath = props.location.pathname;

        const openKeys = [...this.openKeys];

        return <Sider className="sider">
            <Menu mode="inline" openKeys={openKeys} onOpenChange={this.onOpenChange}
                style={{height: '100%'}} defaultSelectedKeys={[currentPath]}>
                <SubMenu key="my" title={userStore.userType ? '我的工作台' : '我的'}>
                    {
                        userStore.userType ? <MenuItem key="/app/teacher">学生管理</MenuItem> : 
                        <MenuItem key="/app/student">个人中心</MenuItem>
                    }
                </SubMenu>
            </Menu>
        </Sider>
    }

}

export default AccountMenu;