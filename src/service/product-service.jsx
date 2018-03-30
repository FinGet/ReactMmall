import MUtil from 'util/mm.jsx'
const _mm = new MUtil();
class Product{
	/**
	 * 获取商品列表
	 * @return {[type]} [description]
	 */
	getProductList(listParam){
		console.log(listParam);
		let url = '',
				data = {};
		if (listParam.listType === 'list') {
			url = '/manage/product/list.do';
			data.pageNum = listParam.pageNum;
		} else if (listParam.listType === 'search') {
			url = '/manage/product/search.do';
			data.pageNum = listParam.pageNum;
			data[listParam.searchType] = listParam.keyword;
		}
		return _mm.request({
  		url: url,
  		data : data
  	})
	}
	/**
	 * 更改商品销售状态
	 * @param {[type]} productInfo [description]
	 */
	setProductStatus(productInfo){
		return _mm.request({
  		url: '/manage/product/set_sale_status.do',
  		data : productInfo
  	})
	}
}

export default Product;