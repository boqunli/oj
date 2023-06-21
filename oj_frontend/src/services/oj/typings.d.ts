declare namespace AUTH {
  type CurrentUser = {
    username?: string;
    userid?: string;
  };

  type LoginResult = {
    success?: string;
    data: {
      token: string;
    };
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
