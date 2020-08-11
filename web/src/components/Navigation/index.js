/* eslint-disable react/jsx-no-target-blank */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import RouterConfig from '@/config/router.config';
import JumpLink from '@/config/jumpLink';
import { Context } from '@/index.js';
import './index.less';

const Navigation = () => {
	const navContext = useContext(Context);
	const { isAdmin } = navContext.state;

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
