import React from 'react';
import ReactDom from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import Introduction from '@/components/Introduction/index';
import Navigation from '@/components/Navigation/index';
import Footer from '@/components/Footer/index';
import RouterConfig from '@/config/router.config';
import './index.less';

const App = () => {
	return (
		<Router>
			<div styleName="container">
				<div styleName="left-container">
					<Introduction></Introduction>
					<Navigation></Navigation>
					<Footer></Footer>
				</div>
				<div styleName="right-container">
					<Switch>
						{RouterConfig.map((item) => {
							return (
								<Route
									path={item.path}
									component={item.Component()}
									exact={item.exact}
									key={item.path}
								></Route>
							);
						})}
						<Redirect to="/"></Redirect>
					</Switch>
				</div>
				<div styleName="cover"></div>
			</div>
		</Router>
	);
};

ReactDom.render(<App />, document.getElementById('App'));
