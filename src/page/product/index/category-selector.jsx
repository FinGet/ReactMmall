import React from 'react';

import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();
const _product = new Product();

import './category-selector.scss';

class CategorySelector extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			firstCategoryList : [],
			firstCategoryId : 0,
			secondCategoryList: [],
			secondCategoryId : 0
		}
	}
	componentDidMount(){
		this.loadFirstCategory();
	}
	/**
	 * 加载一级分类
	 * @return {[array]}
	 */
	loadFirstCategory(){
		_product.getCategoryList().then(res => {
			this.setState({
				firstCategoryList : res.slice(0,20) // 数量太多截取20条
			})
			// console.log(this.state.firstCategoryList);
		}).catch(errMsg => {
			_mm.errorTips(errMsg);
		})
	}
	/**
	 * 加载二级品类
	 * @param  {一级id}
	 * @return {[type]}
	 */
	loadSecondCategory(categoryId){
		_product.getCategoryList(categoryId).then(res => {
			this.setState({
				secondCategoryList : res.slice(0,20) // 数量太多截取20条
			})
		// console.log(this.state.firstCategoryList);
		}).catch(errMsg => {
			_mm.errorTips(errMsg);
		})
	}
	/**
	 * 选择一级品类
	 * @return {[type]}
	 */
	onFirstCategoryChange(e){
		let newValue = e.target.value || 0;
		// 在选择一级分类的时候，二级分类可能已经有值，所以先清空
		this.setState ({
			firstCategoryId : newValue,
			secondCategoryList: [],
			secondCategoryId : 0
		},() => {
			this.loadSecondCategory(newValue);
			this.onPropsCategoryChange();
		})
	}
	/**
	 * 选择二级品类
	 * @return {[type]}
	 */
	onSecondCategoryChange(e){
		let newValue = e.target.value || 0;
		// 在选择一级分类的时候，二级分类可能已经有值，所以先清空
		this.setState ({
			secondCategoryId : 0
		},() => {
			this.onPropsCategoryChange();
		})
	}
	/**
	 * 传个父组件选中的结果
	 * @return {}
	 */
	onPropsCategoryChange(){
		let categoryChangeable = typeof this.props.onCategoryChange === 'function';
		if(this.state.secondCategoryId) {
			this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
		} else {
			this.props.onCategoryChange(this.state.firstCategoryId, 0);
		}
	}
	render(){
		return (
			<div className="col-md-10">
				<select name="" className="form-control cate-select"
					onChange={(e) => this.onFirstCategoryChange(e)}
				>
					<option value="">请选择一级分类</option>
					{
						this.state.firstCategoryList.map((category,index) => {
							return (<option value={category.id} key={index}>{category.name}</option>)
						})
					}
				</select>
				{this.state.secondCategoryList.length>0 ?
					<select name="" className="form-control cate-select"
						onChange={(e) => this.onSecondCategoryChange(e)}
					>
					<option value="">请选择二级分类</option>
					{
						this.state.secondCategoryList.map((category,index) => {
							return (<option value={category.id} key={index}>{category.name}</option>)
						})
					}
				</select> : null
				}
			</div>	
		)
	}
}

export default CategorySelector;