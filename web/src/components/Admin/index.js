import React from 'react';
import { Tabs, Card } from 'antd';
import { MenuConfig } from './config';
import './index.less';

const Admin = () => {
	return (
		<div styleName="admin">
			<div styleName="container">
				<Card style={{ height: '100%' }}>
					<Tabs defaultActiveKey="1">
						{MenuConfig.map((item) => {
							return (
								<Tabs.TabPane key={item.title} tab={item.title}>
									{item.Component}
								</Tabs.TabPane>
							);
						})}
					</Tabs>
				</Card>
			</div>
		</div>
	);
};

export default Admin;
