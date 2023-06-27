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

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type TestCase = {
    ID             ?: number;
    CreatedAt      ?: string;
    UpdatedAt      ?: string;
    DeletedAt      ?: string;
    Identity       ?: string;
    ProblemIdentity?: string;
    Input          ?: string;
    Output         ?: string;
  }

  type CategoryBasic = {
    id        :number;
    created_at :string;
    updated_at :string;
    deleted_at :string;
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
    id              ?:  number;
    identity        ?:  string;
    ProblemCategories?: ProblemCategory[];
    title           ?:  string;
    content         ?:  string;
    max_runtime      ?:  number;
    max_mem          ?:  number;
    created_at :string;
    updated_at :string;
    deleted_at :string;
    test_cases       ?:  TestCase[];
    pass_num         ?:  number;
    submit_num       ?:  number;
  };

  type RegisterParams = {
    username?: string;
    password?: string;
    email?:string;
    captcha?: string;
  };

  type changePasswordParams = {
    username?: string;
    password?: string;
  };
}