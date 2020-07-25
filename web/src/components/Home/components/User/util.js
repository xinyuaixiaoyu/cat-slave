export function userConfig(isLogin, inputdata) {
  const { name, email, password, repeatPassword } = inputdata;
  if (!isLogin) {
    return [
      {
        type: 'text',
        name: 'name',
        placeHolder: 'User Name',
        value: name,
      },
      {
        type: 'text',
        name: 'email',
        placeHolder: 'Email Address',
        value: email,
      },
      {
        type: 'text',
        name: 'password',
        placeHolder: 'Password',
        value: password,
      },
      {
        type: 'text',
        name: 'repeatPassword',
        placeHolder: 'Repeat',
        value: repeatPassword,
      },
    ];
  } else {
    return [
      {
        type: 'text',
        name: 'name',
        placeHolder: 'Name/Email',
        value: name,
      },
      {
        type: 'text',
        name: 'password',
        placeHolder: 'Password',
        value: password,
      },
    ];
  }
}
