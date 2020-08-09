import React from 'react';
import './index.less';

const LoginInterface = ({ userData, onExit, onEdit }) => {
	return (
		<div styleName="container">
			<div styleName="item name">
				{userData.name}
				<div styleName="content">
					<div styleName="triangle"></div>
					<div
						styleName="avator"
						style={{
							backgroundImage: `url(${userData.avator || ''})`,
						}}
					></div>
					<div styleName="edit" onClick={onEdit}>
						修改信息
					</div>
				</div>
			</div>
			<div onClick={onExit} styleName="item">
				Exit
			</div>
		</div>
	);
};

export default LoginInterface;
