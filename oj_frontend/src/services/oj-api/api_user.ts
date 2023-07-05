// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data?: API.CurrentUser;
    code?: number;
    msg?: string;
  }>('/api/current-user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/out-login', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改密码 PUT /api/change-info */
export async function changeInfo(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/change-info', {
    method: 'PUT',
    headers: {
      'authorization': `${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}


/** 验证码接口 POST /api/send-code */
export async function sendCode(body: API.sendCodeParams, options?: { [key: string]: any }) {
  return request<Record<string, any>>( '/api/send-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data : body,
    ...(options || {}),
  });
}

// export async function changePassword(body: AUTH.changePasswordParams, options?: { [key: string]: any }) {
//   return request<Record<string, any>>( '/auth/change/password', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }

export async function GetRankList(param: {current: string, pageSize: string}, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rank-list', {
    params: {
      page: param.current,
      size: param.pageSize,
    },
    method: 'GET',
    ...(options || {}),
  });
}

export async function GetUserDetail(param: string, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user-detail', {
    params: {
      name: param
    },
    method: 'GET',
    ...(options || {}),
  });
}




