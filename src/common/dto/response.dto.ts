export class ResponseDto<T> {
  success: boolean;
  data?: T;
  statusCode?: number;
  message: string;

  constructor(success: boolean, message: string, data?: T, statusCode?: number) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}

export class SuccessResponse<T> extends ResponseDto<T> {
  constructor(data: T, message: string = 'null') {
    super(true, message, data);
  }
}

export class ErrorResponse extends ResponseDto<null> {
  constructor(message: string, statusCode: number) {
    super(false, message, null, statusCode);
  }
}
