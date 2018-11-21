module.exports = (error, req, res, next) => {
  console.log(error);
  if (error) {
    switch (error.statusCode) {
      case 409:
        return res.status(409).json({
          error: {
            message: error.message ? error.message : 'Conflict',
            statusCode: 409,
            statusError: `Conflict: The 409 (Conflict) status code indicates that the request could not be completed due to a conflict with the current state of the target resource.`
          }
        });
      case 404:
        return res.status(404).json({
          error: {
            message: error.message ? error.message : 'Not Found',
            statusCode: 404,
            statusError: `The requested resource could not be found but may be available again in the future. Subsequent requests by the client are permissible.`
          }
        });
      default:
        return res.status(500).json({
          error: {
            message: error.message ? error.message : 'Bad Request',
            statusCode: 500,
            statusError: `Internal server error: The 500 (Internal Server Error) status code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.`
          }
        });
    }
  } else {
    console.log('no error', error);
    next();
  }
};
