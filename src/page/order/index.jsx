import React from 'react';
import {Link} from 'react-router-dom';

import Order from 'service/order-service.jsx';
import MUtil from 'util/mm.jsx'

const _mm = new MUtil();
const _order = new Order();

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';
import IndexListSearch from './index-list-search.jsx';

class OrderList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pageNum : 1,
			list: [],
			listType : 'list' // list or search
		}
	}
	componentDidMount(){
		this.loadOrderList();
	}
	/**
	 * 获取商品列表
	 * @return {[type]} [description]
	 */
	loadOrderList(){
		let listParam = {};
		listParam.listType = this.state.listType;
		listParam.pageNum = this.state.pageNum;
		if(this.state.listType == 'search') {
			listParam.orderNo = this.state.orderNumber;
		}
		_order.getOrderList(listParam).then(res => {
			this.setState(res);
		}).catch(err => {
			this.setState({
				list : []
			})
			_mm.errorTips(err);
		});
	}
	onSearch(orderNumber){
		// console.log(searchType, searchKeyword);
		let listType = orderNumber === '' ? 'list' : 'search';
		this.setState({
			listType: listType,
			pageNum: 1,
			orderNumber: orderNumber
		},()=>{
			this.loadOrderList();
		})
	}
	/**
	 * 分页变化
	 * @param  {[type]} pageNum [description]
	 * @return {[type]}         [description]
	 */
	onPageNumChange(pageNum){
		this.setState({
			pageNum : pageNum
		},() => {
			this.loadOrderList();
		})
	}
	render(){
		let tableHeads = ['订单号','收件人','订单状态','订单总价','创建时间','操作'];
		return (
			<div id="page-wrapper">
				<PageTitle title="订单列表" />
				<IndexListSearch onSearch={(orderNumber) => {
					this.onSearch(orderNumber)
				}}/>
				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map((order, index)=>{
							return (
								<tr key={index}>
                  <td>
                  	<Link to={ `/order/detail/${order.orderNo}` }>{order.orderNo}</Link>
                  </td>
                  <td>{order.receiverName}</td>
                  <td>{order.statusDesc}</td>
                  <td>￥{order.payment}</td>
                  <td>{order.createTime}</td>
                  <td>
                    <Link to={ `/order/detail/${order.orderNo}` }>详情</Link>
                  </td>
              	</tr>
							)
						})
					}
				</TableList>
				<Pagination current={this.state.pageNum} 
				total={this.state.total} 
				onChange={(pageNum) => this.onPageNumChange(pageNum)} />
			</div>
		)
	}
}

export default OrderList;