import {request} from "@@/exports";

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

export async function GetProblemDetail(param: string , options?: {[key:string]:any}) {
  return  request<Record<string, any>>('/api/problem-detail', {
    method: 'GET',
    params: {
      identity: param
    },
    ...(options || {}),
  })
}


export async function CreateProblem(body: API.CreateProblemParam,  options?: { [key: string]: any }) {
  return  request<Record<string, any>>('/api/admin/problem-create', {
    method: 'POST',
    headers: {
      'authorization': `${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

export async function ModifyProblem(body: API.CreateProblemParam,  options?: { [key: string]: any }) {
  return  request<Record<string, any>>('/api/admin/problem-modify', {
    method: 'PUT',
    headers: {
      'authorization': `${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}


export async function SubmitCode(body: {code: string, problem: string},  options?: { [key: string]: any }) {
  return  request<Record<string, any>>('/api/user/submit', {
    method: 'POST',
    headers: {
      'authorization': `${localStorage.getItem('token')}`,
    },
    params: {
      problem_identity : body.problem
    },
    data: body.code,
    ...(options || {}),
  })
}


export async function GetCategoryList(params: Record<string, any>, options?: {[key:string]:any}) {
  return  request<Record<string, any>>('/api/category-list', {
    method: 'GET',
    params: {
      page: params.page,
      size: params.size,
      keyword: params.keyword,
    },
    ...(options || {}),
  })
}

export async function CateCreate(data: {name: string, parentId: number}, options?: {[key:string]:any}) {
  return  request<Record<string, any>>('/api/admin/category-create', {
    method: 'POST',
    headers: {
      'authorization': `${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
    data: {
      name: data.name,
      parentId: data.parentId,
    },
    ...(options || {}),
  })
}


export async function CateModify(data: {identity: string, name: string, parentId: number}, options?: {[key:string]:any}) {
  return  request<Record<string, any>>('/api/admin/category-modify', {
    method: 'PUT',
    headers: {
      'authorization': `${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
    data: {
      identity: data.identity,
      name: data.name,
      parentId: data.parentId,
    },
    ...(options || {}),
  })
}
