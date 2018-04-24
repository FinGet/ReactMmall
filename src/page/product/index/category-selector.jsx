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
	componentWillReceiveProps(nextProps){
		console.log(this.props.categoryId,this.props.parentCategoryId);
    let categoryIdChange        = this.props.categoryId !== nextProps.categoryId,
      parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;

     // console.log(this.props.categoryId)
    // 数据没有发生变化的时候，直接不做处理
    if(!categoryIdChange && !parentCategoryIdChange){
      return;
    }
    // 假如只有一级品类
    if(nextProps.parentCategoryId === 0){
      this.setState({
        firstCategoryId     : nextProps.categoryId,
        secondCategoryId    : 0
      });
    }
    // 有两级品类
    else{
      this.setState({
        firstCategoryId     : nextProps.parentCategoryId,
        secondCategoryId    : nextProps.categoryId
      }, () => {
        parentCategoryIdChange && this.loadSecondCategory();
      });
    }   
  }
	/**
	 * 加载一级分类
	 * @return {[array]}
	 */
	loadFirstCategory(){
		_product.getCategoryList().then(res => {
			this.setState({
				firstCategoryList : res 
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
				secondCategoryList : res 
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
		if(this.props.readOnly){
      return;
    }
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
		if(this.props.readOnly){
      return;
    }
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
					value={this.state.firstCategoryId}
					onChange={(e) => this.onFirstCategoryChange(e)}
					readOnly={this.props.readOnly}
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
					value={this.state.secondCategoryId}
					readOnly={this.props.readOnly}
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