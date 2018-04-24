import MUtil from 'util/mm.jsx'
const _mm = new MUtil();
class Order{
	/**
	 * 获取首页数据
	 * @return {[type]} [description]
	 */
	getOrderList(listParam){
		// console.log(listParam);
		let url = '',
				data = {};
		if (listParam.listType === 'list') {
			url = '/manage/order/list.do';
			data.pageNum = listParam.pageNum;
		} else if (listParam.listType === 'search') {
			url = '/manage/order/search.do';
			data.pageNum = listParam.pageNum;
			data.orderNo = listParam.orderNo;
		}
		return _mm.request({
  		url: url,
  		data : data
  	})
	}
	/**
	 * 获取商品详情
	 * @return {[type]} [description]
	 */
	getOrderDetail(orderNumber){
		return _mm.request({
  		url: '/manage/order/detail.do',
  		data : {
  			orderNo: orderNumber
  		}
  	})
	}
	/**
	 * 发货
	 * @return {[type]} [description]
	 */
	sendGoods(orderNumber){
		return _mm.request({
  		url: '/manage/order/send_goods.do',
  		data : {
  			orderNo: orderNumber
  		}
  	})
	}
}

export default Order;