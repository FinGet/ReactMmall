import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Redirect,Route,Link,Switch} from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
// 页面
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import UserList from 'page/user/index.jsx';
import ProductRouter from 'page/product/router.jsx';

class App extends React.Component{

	render(){
		let LayoutRouter = (
		<Layout>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/product" component={ProductRouter} />
				<Route path="/product-category" component={ProductRouter} />
				<Route path="/user/index" component={UserList} />
				<Redirect exact from="/user" to="/user/index" />
				<Route component={ErrorPage} />
			</Switch>
		</Layout>
	)
		return (
			<Router>
				{/* Router 只能有一个子节点*/}
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route path="/" render={(props) => (
						LayoutRouter
					)} />
				</Switch>
			</Router>
		)
	}
}

ReactDOM.render(
		<App/>,
	document.getElementById('app')
)