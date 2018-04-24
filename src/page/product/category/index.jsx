import React from 'react';
import {Link} from 'react-router-dom';

import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx'

const _mm = new MUtil();
const _product = new Product();

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';

class CategoryList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pageNum : 1,
			list: [],
			parentCategoryId: this.props.match.params.categoryId || 0
		}
	}
	componentDidMount(){
		this.loadCategoryList();
	}
	componentDidUpdate(prevProps,prevState){
		let oldPath = prevProps.location.pathname,
				newPath = this.props.location.pathname,
				newId = this.props.match.params.categoryId || 0;
		if(oldPath !== newPath) {
			this.setState({
				parentCategoryId: newId
			}, () => {
				this.loadCategoryList();
			})
		}
	}
	/**
	 * 获取品类列表
	 * @return {[type]} [description]
	 */
	loadCategoryList(){
		_product.getCategoryList(this.state.parentCategoryId).then(res => {
			this.setState({
				list: res
			});
		}).catch(err => {
			this.setState({
				list : []
			})
			_mm.errorTips(err);
		});
	}
	/**
	 * 分页变化
	 * @param  {[type]} pageNum [description]
	 * @return {[type]}         [description]
	 */
	// onPageNumChange(pageNum){
	// 	this.setState({
	// 		pageNum : pageNum
	// 	},() => {
	// 		this.loadCategoryList();
	// 	})
	// }
	/**
	 * 修改品类
	 * @return {[type]} [description]
	 */
	onUpdateName(categoryId,categoryName){
		let newName = window.prompt('请输入新的品类名称',categoryName);
		if(newName){
			_product.updateCategoryName({
				categoryId : categoryId,
				categoryName: newName
			}).then(res => {
				_mm.successTips(res);
				this.loadCategoryList();
			}).catch(errMsg => {
				_mm.errorTips(errMsg);
			})
		}
	}
	render(){
		let listBody = this.state.list.map((category, index)=>{
				return (
					<tr key = {index}>
						<td>{category.id}</td>
						<td>{category.name}</td>
						<td>
							<a className="opear"
								onClick={(e) => {this.onUpdateName(category.id,category.name)}}
							>修改名称</a>
							{
								category.parentId === 0 ? 
								<Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
								: null
							}
						</td>
					</tr>
				)
			});
		return (
			<div id="page-wrapper">
				<PageTitle title="品类列表">
					<Link className="btn btn-primary page-header-right" to="/product-category/add">
						<i className="fa fa-plus" ></i>
						添加分类
					</Link>
				</PageTitle>
				
				<div className="row">
					<div className="col-md-12">
						<p>父品类ID: {this.state.parentCategoryId}</p>
					</div>
				</div>
				<TableList tableHeads={['品类ID','品类名称','操作']}>
					{listBody}
				</TableList>
			{/*
				<Pagination current={this.state.pageNum} 
				total={this.state.total} 
				onChange={(pageNum) => this.onPageNumChange(pageNum)} />*/}
			</div>
		)
	}
}

export default CategoryList;