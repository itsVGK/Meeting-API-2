const response = require('./../libs/responseLib')

let errorHandler = (err, req, res, next) => {
    res.send(response.generate(true, 'Error Occured at global level', 500, null))
}

let notFoundHandler = (req, res, next) => {
    console.log('not found handler called')
    res.send(response.generate(true, 'Route not found in the application', 404, null));
}

module.exports = {
    globalErrorHandler: errorHandler,
    globalNotFoundHandler: notFoundHandler
}