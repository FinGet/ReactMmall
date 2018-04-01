import React from 'react';
import {BrowserRouter as Router,Redirect,Route,Link,Switch} from 'react-router-dom';

// 页面
import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';

class ProductRouter extends React.Component{
	render(){
		return (
			<Switch>
				<Route path="/product/index" component={ProductList} />
				<Route path="/product/save" component={ProductSave} />
				<Redirect exact from="/product" to="/product/index" />
			</Switch>
		)
	}
}

export default ProductRouter;