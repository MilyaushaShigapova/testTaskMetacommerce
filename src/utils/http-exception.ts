export class HttpException extends Error {
  public message: any;
  public status: number;

  constructor(message: any = '', status: number = 400) {
    super();
    this.message = message;
    this.status = status;
  }
}
