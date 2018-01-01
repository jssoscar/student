/*
 * @Author			jssoscar
 * @Date			2017-12-22 19:50:21 
 * @Version			1.0 
 * @Description	
 */

import {observable, action, transaction} from 'mobx'

class UserInfo {
    @observable account = '';

    @observable username = '';

    @observable logged = false;

    @observable userType = 0;

    @observable avatar = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1175020977,2376655099&fm=27&gp=0.jpg";

    @action login = (data = {}) => {
        transaction(() => {
            Object.assign(this, data, {
                logged : true
            });
        });
    }

    @action logout = () => {
        this.logged = false;
    }
}

export default new UserInfo();