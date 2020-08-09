/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import RouterConfig from '@/config/router.config';
import JumpLink from '@/config/jumpLink';
import { queryAdmin } from '@/service/user';
import './index.less';

const Navigation = () => {
	const [isAdmin, changeStatus] = useState(false);
	const getAdminStatus = async () => {
		const { success, admin = false } = await queryAdmin();
		if (success) {
			changeStatus(admin);
		}
	};
	useEffect(() => {
		getAdminStatus();
	}, []);
	return (
		<div styleName="container">
			<div styleName="left">
				{RouterConfig.map((item) => {
					if (!item.needAdmin || (item.needAdmin && isAdmin)) {
						return (
							<NavLink to={item.path} key={item.path}>
								<div styleName="title">{item.title}</div>
							</NavLink>
						);
					}
				})}
			</div>
			<div styleName="right">
				{JumpLink.map((item) => {
					return (
						<a
							href={item.path}
							key={item.title}
							styleName="title"
							target="_blank"
						>
							{item.title}
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default Navigation;
