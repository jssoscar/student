/*
 * @Author			jssoscar
 * @Date			2017-12-25 19:53:10
 * @Version			1.0
 * @Description
 */

import React, {Component} from 'react'
import {inject} from 'mobx-react'
import {Redirect} from 'react-router'

const auth = Comp => {
    @inject('userStore')
    class Auth extends Component {
        componentWillMount() {
            this.validate(this.props.userStore.logged);
        }

        componentWillReceiveProps(nextProps) {
            this.validate(nextProps.userStore.logged);
        }

        validate = (logged = true) => {
            if (!logged) {
                const {props} = this;

                props.history.push(`/login`);
            }
        }

        render() {
            const {logged} = this.props.userStore;
            return logged ? <Comp {...this.props} /> : <Redirect to="/login" />;
        }
    }

    return Auth;
}

export default auth;