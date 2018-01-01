/*
 * @Author			jssoscar
 * @Date			2017-12-31 21:10:54 
 * @Version			1.0 
 * @Description	
 */

 import React, {Component} from 'react';
 import {Switch, Route} from 'react-router-dom'
 import Async from 'src/components/async'
 import Footer from './Footer'

 const Teacher = Async(() => import('src/pages/teacher'));
 const Student = Async(() => import('src/pages/student'));

 class Content extends Component{
     render() {
         return <div className="content">
            <div className="content-container">
                <Switch>
                    <Route path="/app/teacher" component={Teacher}></Route>
                    <Route path="/app/student" component={Student}></Route>
                </Switch>
            </div>
            <Footer />
         </div>
     }
 }

 export default Content;