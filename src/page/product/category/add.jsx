import React from 'react';
import {Link} from 'react-router-dom';

import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx'

const _mm = new MUtil();
const _product = new Product();

import PageTitle from 'component/page-title/index.jsx';

class CategoryAdd extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			categoryList: [],
			parentId: 0,
			categoryName: ''
		}
	}
	componentDidMount(){
		this.loadCategoryList();
	}
	onValueChange(e){
		let name = e.target.name,
			value = e.target.value.trim();

		this.setState({
			[name] : value
		})
	}
	/**
	 * 获取品类列表
	 * @return {[type]} [description]
	 */
	loadCategoryList(){
		_product.getCategoryList().then(res => {
			this.setState({
				categoryList: res
			});
		}).catch(err => {
			_mm.errorTips(err);
		});
	}
	/**
	 * 提交表单
	 * @return {[type]} [description]
	 */
	onSubmit(e){
		if(this.state.categoryName){
			_product.saveCategory({
				parentId : this.state.parentId,
				categoryName: this.state.categoryName
			}).then((res) => {
				_mm.successTips(res);
				this.props.history.push('/product-category/index');
			}).catch((errMsg) => {
				_mm.errorTips(errMsg);
			})
		} else {
			_mm.errorTips('请输入品类名称!');
		}
	}
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title="品类列表"/>
				<div className="row">
					<div className="col-md-12">
						<div className="form-horizontal">
							<div className="form-group">
		            <label className="col-md-2 control-label">所属品类</label>
		            <div className="col-md-5">
	              <select name="parentId" className="form-control"
	              	onChange={(e) => this.onValueChange(e)}
	              >
	              	<option value="0">根品类/</option>
	              	{
	              		this.state.categoryList.map((category,index) => {
	              			return (
	              				<option value={category.id} key={index}>根品类/{category.name}</option>
	              			)
	              		})
	              	}
	              </select>
	            	</div>
          		</div>
		          <div className="form-group">
		            <label className="col-md-2 control-label">品类名称</label>
		            <div className="col-md-5">
		              <input type="text" className="form-control" 
		                placeholder="请输入品类名称"
		                name="categoryName"
		                value={this.state.categoryName}
		                onChange={(e) => this.onValueChange(e)}/>
		            </div>
		          </div>
		          <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="submit" className="btn btn-primary" 
                  onClick={(e) => {this.onSubmit(e)}}>提交</button>
              </div>
            </div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CategoryAdd;