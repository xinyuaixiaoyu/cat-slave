import React, { useState, useEffect } from 'react';
import { userConfig, UserRegMap } from './util';
import { login, register } from '@/service/user';
import cookie from 'react-cookies';
import Message from '@/components/Message';
import './index.less';

const User = ({ onLogin }) => {
	const [isLogin, setLoginStatus] = useState(false);
	const [registerData, setRegisterData] = useState({
		name: '',
		email: '',
		password: '',
		repeatPassword: '',
	});
	const [loginData, setLoginData] = useState({
		name: '',
		password: '',
	});
	const [userRegStatus, setRegStatus] = useState({
		name: null,
		email: null,
		password: null,
		repeatPassword: null,
	});
	const handleChange = (value, key) => {
		if (!isLogin) {
			setRegisterData({
				...registerData,
				[key]: value,
			});
			if (key === 'password') {
				if (registerData['repeatPassword']) {
					const regStatus =
						value === registerData['repeatPassword'] &&
						UserRegMap.get(key).test(value);
					setRegStatus({
						...userRegStatus,
						[key]: regStatus,
						repeatPassword: regStatus,
					});
				} else {
					setRegStatus({
						...userRegStatus,
						[key]: UserRegMap.get(key).test(value),
					});
				}
			} else if (key === 'repeatPassword') {
				if (registerData['password']) {
					const regStatus =
						value === registerData['password'] &&
						UserRegMap.get(key).test(value);
					setRegStatus({
						...userRegStatus,
						[key]: regStatus,
						password: regStatus,
					});
				} else {
					setRegStatus({
						...userRegStatus,
						[key]: UserRegMap.get(key).test(value),
					});
				}
			} else {
				setRegStatus({
					...userRegStatus,
					[key]: UserRegMap.get(key).test(value),
				});
			}
		} else {
			setLoginData({
				...loginData,
				[key]: value,
			});
		}
	};

	const inputConfig = userConfig(isLogin);
	const changeStatus = () => {
		setLoginStatus(!isLogin);
	};
	const onSubmit = async () => {
		if (isLogin) {
			const { success, _id } = await login(loginData);
			if (success) {
				Message.success('登陆成功');
				cookie.save('userId', btoa(_id));
				onLogin();
			}
		} else {
			let isReg = true;
			Object.keys(userRegStatus).forEach((item) => {
				if (!userRegStatus[item]) {
					isReg = false;
				}
			});
			if (isReg) {
				const res = await register(registerData);
				if (res.success) {
					changeStatus();
				}
			} else {
				console.log('验证不通过');
			}
		}
	};
	useEffect(() => {
		const userId = cookie.load('userId');
		if (userId) {
			onLogin();
		}
	}, []);

	return (
		<div styleName="container">
			<div styleName="title">Welcome</div>
			<div styleName="description">
				We can communicate with each other if you are interested
			</div>
			<div styleName="description">
				You can leave a message comment thumb up
			</div>
			<div styleName="input_container">
				{inputConfig.map((item) => {
					return (
						<input
							key={item.name}
							type={item.type}
							placeholder={item.placeHolder}
							value={isLogin ? loginData[item.name] : registerData[item.name]}
							onChange={(e) => handleChange(e.target.value, item.name)}
							styleName={
								registerData[item.name] && !isLogin
									? userRegStatus[item.name] === true
										? ''
										: 'failed'
									: ''
							}
						/>
					);
				})}
			</div>
			<div styleName="button" onClick={onSubmit}>
				{isLogin ? 'Login' : 'Register'}
			</div>
			<div styleName="tab_container">
				<div styleName="forget">Password</div>
				<div>|</div>
				<div styleName="tab_btn" onClick={changeStatus}>
					{!isLogin ? 'Login' : 'Register'}
				</div>
			</div>
		</div>
	);
};

export default User;
