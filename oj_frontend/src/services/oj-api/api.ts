// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
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
/** 问题列表 GET /api/problem-list */
export async function GetProblemList(params: Record<string, any>, options?: {[key:string]:any}) {
  return  request<Record<string, any>>('/api/problem-list', {
    method: 'GET',
    params: {
      page: params.page,
      size: params.size,
      keyword: params.keyword,
      category_name: params.category,
    },
  ...(options || {}),
  })
}

/** 注册接口 POST /api/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<Record<string, any>>( '/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
    ...(options || {}),
  });
}

/** 验证码接口 POST /api/send-code */
export async function sendCode(mail: string, options?: { [key: string]: any }) {
  return request<Record<string, any>>( '/api/send-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      email: mail
    },
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


