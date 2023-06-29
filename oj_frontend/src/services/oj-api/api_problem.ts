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

export async function CreateProblem(data: API.ProblemItem, options?: {[key:string]:any}) {
  return  request<Record<string, any>>('/api/problem-create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
    ...(options || {}),
  })
}

