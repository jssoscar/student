/*
 * @Author			jssoscar
 * @Date			2017-12-23 00:30:32 
 * @Version			1.0 
 * @Description	
 */

import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Layout} from 'antd'
import Header from './Header'
import Menu from './Menu'
import Content from './Content'

@inject('userStore')
@observer
class App extends Component {

  render() {
    const {props} = this;

    return <Layout>
      <Header {...props} />
      <Menu {...props} />
      <Content {...props} />
    </Layout>
  }
}

export default App;