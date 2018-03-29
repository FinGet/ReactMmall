import React from 'react';

import User from 'service/user-service.jsx';
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();
const _user = new User();

import './index.scss';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			redirect: _mm.getUrlParam('redirect') || '/'
		}
	}
	componentWillMount(){
		document.title = '登陆 - HAPPY MMALL';
	}
	/**
	 * 当用户输入改变时，设置state
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
  onInputChange(e){
    let inputValue  = e.target.value,
        inputName   = e.target.name;
    this.setState({
        [inputName] : inputValue
    });
  }
  /**
   * 点击回车提交
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  onInputKeyUp(e){
    if(e.keyCode === 13){
      this.onSubmit();
    }
  }
  /**
   * 登陆事件
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  onSubmit(e){
  	let loginInfo = {
  		username : this.state.username,
			password : this.state.password
  	},
  	checkResult = _user.checkLoginInfo(loginInfo);
  	if (checkResult.status) {
  		_user.login(loginInfo).then((res)=>{
  			_mm.setStorage('userInfo', res);
	  		this.props.history.push(this.state.redirect);
	  	}).catch((err) => {
	  		_mm.errorTips(err);
	  	})
  	} else {
  		_mm.errorTips(checkResult.msg);
  	}
  	
  }
	render(){
		return (
			<div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input type="text"
                    name="username"
                    className="form-control"
                    placeholder="请输入用户名"
                    onKeyUp={e => this.onInputKeyUp(e)}
                    onChange={e => this.onInputChange(e)}/>
              </div>
              <div className="form-group">
                <input type="password" 
                    name="password"
                    className="form-control" 
                    placeholder="请输入密码"
                    onKeyUp={e => this.onInputKeyUp(e)}
                    onChange={e => this.onInputChange(e)}/>
              </div>
              <button className="btn btn-lg btn-primary btn-block"
             	onClick = {e => this.onSubmit(e)}
             	>登录</button>
            </div>
          </div>
        </div>
    	</div>
		)
	}
}

export default Login;