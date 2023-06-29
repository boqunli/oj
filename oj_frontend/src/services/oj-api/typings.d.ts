// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    username?: string;
    userid?: string;
    is_admin?: number;
  };

  type LoginResult = {
    code?: number;
    msg?: string;
    data?: {
      token?: string
      is_admin?: number
    };
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
  };

  type TestCase = {
    Input          ?: string;
    Output         ?: string;
  }

  type CategoryBasic = {
    id        :number;
    identity  :string;
    name      :string;
    parent_id  :number;
  };

  type ProblemCategory = {
    id            :number;
    created_at :string;
    updated_at :string;
    deleted_at :string;
    problem_id     :number;
    category_id    :number;
    category_basic : CategoryBasic;
  };

  type ProblemItem = {
    identity        ?:  string;
    ProblemCategories?: number[];
    title           ?:  string;
    content         ?:  string;
    max_runtime      ?:  number;
    max_mem          ?:  number;
    test_cases       ?:  TestCase[];
  };

  type RegisterParams = {
    name?: string;
    password?: string;
    email?:string;
    code?: string;
    phone?:string
  };

  type changePasswordParams = {
    username?: string;
    password?: string;
  };

  type sendCodeParams = {
    email?: string;
  }
}
