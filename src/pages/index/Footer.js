/*
 * @Author			jssoscar
 * @Date			2017-12-31 20:29:55 
 * @Version			1.0 
 * @Description	
 */

 import React from 'react'
 import {Layout, Icon} from 'antd'

 const {Footer} = Layout;

 class MyFooter extends React.Component {
     render() {
         return <Footer className="footer">
            <Icon type="copyright" style={{marginRight: 10}} />
            2018 北京石油化工学院  
         </Footer>
     }
 }

 export default MyFooter;
