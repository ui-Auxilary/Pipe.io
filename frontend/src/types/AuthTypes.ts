

export interface RegisterResponse {
  data: {
    detail: string;
    token: string;
  }
}


export interface ErrorResponse {
  response: {
    data: {
      detail: string;
    }
  }
}