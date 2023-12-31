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

  interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
  }

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
    id          ?  :number;
    created_at ?:string;
    updated_at ?:string;
    deleted_at ?:string;
    problem_id     ?:number;
    category_id    ?:number;
    category_basic? : CategoryBasic;
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

  type TestCaseParam = {
    input ? : string,
    output? : string,
  }

  type CreateProblemParam = {
    identity        ?:  string;
    title           ?:  string;
    content         ?:  string;
    problem_categories?: number[];
    max_runtime      ?:  number;
    max_mem          ?:  number;
    test_cases       ?:  TestCaseParam[];
    // pass_num         ?:  number;
    // submit_num       ?:  number;
  }

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

  interface UserInfo {
    id              ?:   number;
    identity        ?:   string;
    name            ?:   string;
    phone           ?:   string;
    mail            ?:   string;
    created_at      ?:   string;
    updated_at      ?:   string;
    deleted_at      ?:   string;
    pass_num        ?:   number;
    submit_num      ?:   number;
    is_admin        ?:   number;
  }



}
