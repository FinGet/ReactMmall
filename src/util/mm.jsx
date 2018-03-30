// 工具类
class MUtil{
	/**
	 * 基于jquery封装一个promise ajax请求
	 * @param  {[type]} param [选项]
	 * @return {[type]}       [description]
	 */
	request(param){
		return new Promise((resolve,reject) => {
			$.ajax({
				type : param.type || 'get',
				url : param.url || '',
				dataType : param.dataType || 'json',
				data : param.data || null,
				success:(res)=>{ // 用箭头函数避免this指向问题
					if (0 === res.status) {
						typeof resolve === 'function'&&resolve(res.data, res.msg);
					} else if (10 === res.status) {
						// 需要登陆
						this.doLogin();
					} else {
						typeof reject === 'function'&&reject(res.msg || res.data);
					}
					
				},
				error:(err)=>{
					typeof reject === 'function'&&reject(err.statusText);
				}
			})
		})
	}
	/**
	 * 跳转到登陆页面
	 * @return {[type]} [description]
	 */
	doLogin(){
		window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname);
	}
	/**
	 * 获取url参数
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	getUrlParam(name){
		// xxxx.com?param1=123&param2=456
		let queryString = window.location.search.split('?')[1] || '',
				reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
				result = queryString.match(reg);

		// result : ['param1=123','','123','&']
		return result ? decodeURIComponent(result[2]) : null

	}
	/**
	 * 错误提示
	 * @param  {[type]} errMsg [description]
	 * @return {[type]}        [description]
	 */
	errorTips(errMsg) {
		alert(errMsg || '好像哪里不对了~');
	}
	/**
	 * 成功提示
	 * @param  {[type]} successMsg [description]
	 * @return {[type]}        [description]
	 */
	successTips(successMsg) {
		alert(successMsg || '操作成功~');
	}
	/**
	 * 本地存储
	 * @param {[type]} name [description]
	 * @param {[type]} data [description]
	 */
  setStorage(name, data){
      let dataType = typeof data;
      // json对象
      if(dataType === 'object'){
          window.localStorage.setItem(name, JSON.stringify(data));
      }
      // 基础类型
      else if(['number','string','boolean'].indexOf(dataType) >= 0){
          window.localStorage.setItem(name, data);
      }
      // 其他不支持的类型
      else{
          alert('该类型不能用于本地存储');
      }
  }
  /**
   * 取出本地存储
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  getStorage(name){
      let data = window.localStorage.getItem(name);
      if(data){
          return JSON.parse(data);
      }
      else{
          return '';
      }
  }
  /**
   * 删除本地存储
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  removeStorage(name){
      window.localStorage.removeItem(name);
  }
}

export default MUtil;