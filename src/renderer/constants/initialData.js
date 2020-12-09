export const defaultRoleInfo = process.env.NODE_ENV === 'production' 
? ({
  name: '',
  user: '',
  pwd: '',
  api: '',
  domain: '',
}) : ({
  name: '',
  user: '15992470692',
  pwd: '123456',
  api: 'http://120.236.169.14:7081/v1',
  domain: 'atwork',
});

export const defaultAppInfo = process.env.NODE_ENV === 'production' 
? ({
  name: '',
}) : ({
  name: 'test',
});
