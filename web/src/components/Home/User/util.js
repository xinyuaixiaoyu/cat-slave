export function userConfig(isLogin) {
	if (!isLogin) {
		return [
			{
				type: 'text',
				name: 'name',
				placeHolder: 'User Name',
				required: true,
			},
			{
				type: 'email',
				name: 'email',
				placeHolder: 'Email Address',
				required: true,
			},
			{
				type: 'password',
				name: 'password',
				placeHolder: 'Password',
				required: true,
			},
			{
				type: 'password',
				name: 'repeatPassword',
				placeHolder: 'Repeat',
				required: true,
			},
		];
	} else {
		return [
			{
				type: 'text',
				name: 'name',
				placeHolder: 'Name/Email',
				required: true,
			},
			{
				type: 'password',
				name: 'password',
				placeHolder: 'Password',
				required: true,
			},
		];
	}
}

export const UserRegMap = new Map([
	['name', /^[a-zA-Z0-9_-]{3,16}$/],
	['email', /^([a-zA-z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/],
	['password', /^(\w){6,16}$/],
	['repeatPassword', /^(\w){6,16}$/],
]);
