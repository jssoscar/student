/*
 * @Author			jssoscar
 * @Date			2017-12-23 00:30:32 
 * @Version			1.0 
 * @Description	
 */

import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { Layout, Dropdown, Avatar, Menu, Icon} from 'antd';
import logo from '../../img/logo.svg'

@inject('userStore')
@observer
class App extends Component {

  logout = () => {
    this.props.userStore.logout();
    this.props.history.push('/login');
  }

  render() {
    const {props} = this,
      {userStore} = props;

    const menu = (
      <Menu selectedKeys={[]} onClick={this.logout}>
        <Menu.Item key="logout" onClick={this.logout} className="menu">
          <Icon type="logout" style={{marginRight: 6}} />退出登录
        </Menu.Item>
      </Menu>
    );

    return <Layout.Header style={{padding: '0 0', height: 72}} className="header-container">
        <div className="header">
          <div>
            <img src={logo} alt="logo" className="logo" />
            <span className="title">教务管理系统</span>
          </div>
          <div className="notice">
            <Dropdown overlay={menu}>
              <span className="acount">
                <Avatar className="avatar" src={userStore.avatar} />
                {userStore.username}
              </span>
            </Dropdown>
          </div>
      </div>
    </Layout.Header>
  }
}

export default App;