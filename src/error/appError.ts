export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 400) {
    super();
    this.statusCode = statusCode;
  }
}
