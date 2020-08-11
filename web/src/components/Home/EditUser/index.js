import React, { useState, useRef } from 'react';
import { userConfig, UserRegMap } from '../User/util';
import { updateUser } from '@/service/user';
import Message from '@/components/Message';
import './index.less';

const EditUser = ({ userData, cancelEdit, queryUserData }) => {
	const imgFile = useRef();
	const [editUserData, changeUserData] = useState({
		name: userData.name,
		email: userData.email,
		password: '',
		repeatPassword: '',
		avator: userData.avator,
	});
	const [userRegStatus, setRegStatus] = useState({
		name: true,
		email: true,
		password: true,
		repeatPassword: true,
	});
	const editConfig = userConfig(false);
	const handleChange = (value, key) => {
		changeUserData({
			...editUserData,
			[key]: value,
		});
		if (key === 'password') {
			let regStatus;
			if (editUserData['repeatPassword']) {
				regStatus =
					value === editUserData['repeatPassword'] &&
					UserRegMap.get(key).test(value);
			} else {
				regStatus = value ? UserRegMap.get(key).test(value) : true;
			}
			setRegStatus({
				...userRegStatus,
				[key]: regStatus,
				repeatPassword: regStatus,
			});
		} else if (key === 'repeatPassword') {
			let regStatus;
			if (editUserData['password']) {
				regStatus =
					value === editUserData['password'] && UserRegMap.get(key).test(value);
			} else {
				regStatus = value ? UserRegMap.get(key).test(value) : true;
			}
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
	};
	const onSubmit = async () => {
		const { name, email, password, avator } = editUserData;
		let isReg = true;
		Object.keys(userRegStatus).forEach((item) => {
			if (!userRegStatus[item]) {
				isReg = false;
			}
		});
		if (isReg) {
			const res = await updateUser({
				name,
				email,
				password,
				avator,
			});
			if (res.success) {
				Message.success('编辑成功');
				cancelEdit();
				queryUserData();
			}
		} else {
			console.log('验证不通过');
		}
	};
	const handleFileChange = (files) => {
		const img = files[0];
		const reader = new FileReader();
		reader.readAsDataURL(img);
		reader.onload = (e) => {
			changeUserData({
				...editUserData,
				avator: e.target.result,
			});
		};
	};
	const clickFileBtn = () => {
		imgFile.current.click();
	};

	return (
		<div styleName="container">
			<div styleName="input_container">
				<div styleName="title">Editing...</div>
				{editConfig.map((item) => {
					return (
						<input
							key={item.name}
							type={item.type}
							placeholder={item.placeHolder}
							value={editUserData[item.name]}
							onChange={(e) => handleChange(e.target.value, item.name)}
							styleName={
								editUserData[item.name]
									? userRegStatus[item.name] === true
										? ''
										: 'failed'
									: ''
							}
						/>
					);
				})}
				<div styleName="setting">
					<div styleName="file-btn" onClick={clickFileBtn}>
						点击上传头像
					</div>
					<input
						type="file"
						accept="image/*"
						ref={imgFile}
						styleName="file"
						onChange={(e) => handleFileChange(e.target.files)}
					></input>
					{editUserData.avator && (
						<div
							alt=""
							styleName="avator"
							style={{ backgroundImage: `url(${editUserData.avator})` }}
						></div>
					)}
				</div>
				<div styleName="btn-container">
					<div onClick={cancelEdit} styleName="btn cancel-btn">
						取消
					</div>
					<div styleName="btn sure-btn" onClick={onSubmit}>
						确认修改
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditUser;
