import MUtil from 'util/mm.jsx'
const _mm = new MUtil();
class User{
	/**
	 * 用户登陆
	 * @param  {[type]} loginInfo [传递参数，用户名和密码]
	 * @return {[promise]}        [description]
	 */
	login(loginInfo){
		return _mm.request({
  		type: 'post',
  		url: '/manage/user/login.do',
  		data: loginInfo
  	})
	}
	/**
	 * 检查登陆接口数据是否合法
	 * @return {[object]} [object]
	 */
	checkLoginInfo(loginInfo){
		let username = $.trim(loginInfo.username),
				password = $.trim(loginInfo.password);
		if (typeof username !== 'string' || username.length === 0) {
			return {
				status : false,
				msg: '用户名不能为空！'
			}
		}
		if (typeof password !== 'string' || password.length === 0) {
			return {
				status : false,
				msg: '密码不能为空！'
			}
		}
		return {
			status: true,
			msg: '验证通过'
		}
	}
	/**
	 * 退出登陆
	 * @return {[type]} [description]
	 */
	logout(){
		return _mm.request({
  		type: 'post',
  		url: '/user/logout.do',
  	})
	}
	/**
	 * 获取用户列表
	 * @return {[type]} [description]
	 */
	getUserList(pageNum){
		return _mm.request({
  		url: '/manage/user/list.do',
  		data : {
  			pageNum: pageNum
  		}
  	})
	}
}

export default User;