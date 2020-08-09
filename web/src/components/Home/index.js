import React, { useState } from 'react';
import User from './User/index';
import EditUser from './EditUser';
import LoginInterface from './LoginInterface';
import cookie from 'react-cookies';
import { queryUserByToken } from '@/service/user';
import './index.less';

const Home = () => {
	const [loginStatus, changeStatus] = useState(false);
	const [editStatus, changeEditStatus] = useState(false);
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		avator: '',
	});
	const queryUserData = async () => {
		const { success, name, email, avator } = await queryUserByToken();
		if (success) {
			setUserData({
				name,
				email,
				avator,
			});
		}
	};
	const onLogin = () => {
		queryUserData();
		changeStatus(true);
	};
	const onExit = () => {
		cookie.remove('userId');
		cookie.remove('token');
		changeStatus(false);
	};
	return (
		<div styleName="container">
			{loginStatus ? (
				<React.Fragment>
					<LoginInterface
						userData={userData}
						onExit={onExit}
						onEdit={() => changeEditStatus(true)}
					></LoginInterface>
					{editStatus && (
						<EditUser
							userData={userData}
							cancelEdit={() => changeEditStatus(false)}
							queryUserData={queryUserData}
						/>
					)}
				</React.Fragment>
			) : (
				<User onLogin={onLogin}></User>
			)}
		</div>
	);
};

export default Home;
