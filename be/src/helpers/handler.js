class ResponseHandler {
  constructor(res) {
    this.res = res;
  }

  resp(data, statusCode = 200, errorMsg = "", errorCode = 0) {
    let success = false;
    if (errorMsg === "") {
      success = true;
    }
    return this.res.status(statusCode).json({
      success,
      error: {
        errorStatus: errorCode,
        message: errorMsg,
      },
      data: data,
    });
  }
}

module.exports = ResponseHandler;
