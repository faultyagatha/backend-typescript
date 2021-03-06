export default class ApiError extends Error {
  constructor(
    readonly statusCode: number,
    readonly message: string,
    readonly source?: Error
  ) {
    super();
  }
}

export class NotFoundError extends ApiError {
  constructor(readonly message: string = 'Not Found', source?: Error) {
    super(404, message, source);
  }
}

export class ForbiddenError extends ApiError {
  constructor(readonly message: string = 'Forbidden', source?: Error) {
    super(403, message, source);
  }
}

export class InternalServerError extends ApiError {
  constructor(
    readonly message: string = 'Internal Server Error',
    source?: Error
  ) {
    super(500, message, source);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    readonly message: string = 'Unauthorized Request',
    source?: Error
  ) {
    super(401, message, source);
  }
}

export class BadRequestError extends ApiError {
  constructor(readonly message: string = 'Bad Request', source?: Error) {
    super(400, message, source);
  }
}

export class JWTError extends ApiError {
  constructor(
    readonly message: string = 'Invalid Token. Please login again',
    source?: Error
  ) {
    super(400, message, source);
  }
}

export class AppError extends ApiError {
  constructor(
    readonly message: string = 'Something went wrong. Please reload the page and try again.',
    source?: Error
  ) {
    super(400, message, source);
  }
}

export class RequestValidationError extends ApiError {
  constructor(
    readonly message: string = 'Invalid request params.',
    source?: Error
  ) {
    super(400, message, source);
  }
}
