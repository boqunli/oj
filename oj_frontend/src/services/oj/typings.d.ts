declare namespace AUTH {
  type CurrentUser = {
    username?: string;
    userid?: string;
  };

  type LoginResult = {
    code?: number;
    data?: {
      is_admin: number;
      token: string;
    };
    msg?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
  };

  type RegisterParams = {
    username?: string;
    password?: string;
  };

  type changePasswordParams = {
    username?: string;
    password?: string;
  };

}

declare namespace API {

  type PaginationParams = {
    id?: number;
    current?: number;
    pageSize?: number;
  }

}
