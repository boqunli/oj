import { request } from '@umijs/max';

/** 登录接口 POST /auth/login */
export async function login(body: AUTH.LoginParams, options?: { [key: string]: any }) {
  return request<AUTH.LoginResult>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    skipErrorHandler: false,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /auth/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/auth/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /auth/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/auth/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 注册接口 POST /auth/register */
export async function register(body: AUTH.RegisterParams, options?: { [key: string]: any }) {
  return request<Record<string, any>>( '/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function changePassword(body: AUTH.changePasswordParams, options?: { [key: string]: any }) {
  return request<Record<string, any>>( '/auth/change/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
