import React from 'react';
import { MountComponent } from '../MountComponent';
import './index.less';

const Loading = ({ show }) => {
	if (!show) return null;
	return (
		<div styleName="container">
			<div styleName="content">
				<div styleName="circle"></div>
				<div styleName="text">Loading...</div>
			</div>
		</div>
	);
};

const LoadingWrapComponent = {
	show: () => MountComponent(<Loading show={true}></Loading>),
	hide: () => MountComponent(<Loading show={false}></Loading>),
};

export default LoadingWrapComponent;
