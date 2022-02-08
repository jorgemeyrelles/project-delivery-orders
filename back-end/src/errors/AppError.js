class AppError extends Error {
  constructor(code, message) {
    super();
    this.message = message;
    this.httpStatusCode = code;
  }
}

module.exports = { AppError };