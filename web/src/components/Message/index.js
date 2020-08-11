import React, { useState, useEffect, useRef } from 'react';
import { MountComponent } from '../MountComponent';
import './index.less';

const Message = ({ type = '', value = '' }) => {
	if (!type || !value) return null;
	const [visible, setVisible] = useState(true);
	const messageRef = useRef();
	useEffect(() => {
		messageRef.current = setTimeout(() => {
			setVisible(false);
		}, 1000);
		return () => messageRef.current && clearTimeout(messageRef.current);
	}, []);

	if (!visible) return null;

	return (
		<div styleName="container">
			<div styleName={`${type}-content`}>
				<div styleName="icon"></div>
				<div styleName="text">{value}</div>
			</div>
		</div>
	);
};

const MessageWrapComponent = {
	success: (message) =>
		MountComponent(<Message type="success" value={message}></Message>),
	warning: (message) =>
		MountComponent(<Message type="warning" value={message}></Message>),
	error: (message) =>
		MountComponent(<Message type="error" value={message}></Message>),
	hide: () => MountComponent(<Message show={false}></Message>),
};

export default MessageWrapComponent;
