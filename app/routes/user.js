const express = require('express')
const appConfig = require('./../../config/appConfig')
const userController = require('./../controllers/userController')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`

    app.post(`${baseUrl}/login`, userController.loginFunction)
    /**
       * @apiGroup Users
       * @apiVersion 0.0.1
       * @api {POST} /api/v1/users/login LOGIN
       *      
       * @apiParam {String} email Email of the User. (body Params) (required)
       * @apiParam {String} password Password to Login. (body Params) (required)
       * 
       * @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
       * 
       * @apiSuccessExample {json} Success-Response:
       *{
            "error": false,
            "message": "Logged in Successfully",
            "status": 200,
            "data": {
            "userId": "xLE6cz_Xw",
            "firstName": "asd",
            "lastName": "asd",
            "email": "asd@gmail.com",
            "createdOn": "2019-08-11T07:22:33.000Z",
            "mobile": "23432423423",
            "_id": "5d4fc239f059243cc8e3c28f",
            "userName": "admin_asd",
            "__v": 0
        }
       * 
       * @apiErrorExample  {json} Error- Response
       * {
       *       "error":true,
       *       "message":"Invalid password",
       *       "status":400,
       *        "data":null
       * }
       */
    app.post(`${baseUrl}/signup`, userController.singupFunction)

    /**
  * @apiGroup Users
  * @apiVersion 0.0.1
  * @api {POST} /api/v1/users/signup SIGNUP
  *     
  * @apiParam {String} firstName FirstName of the User. (body Params) (required)
  * @apiParam {String} lastName LastName to Login. (body Params) (required)
  * @apiParam {String} email Email of the User. (body Params) (required)
  * @apiParam {String} password Password to Login. (body Params) (required)
  * @apiParam {String} mobile users mobile number. (body Params) (required)
  * @apiParam {String} username user Name to identify admin. (body Params) (required)
  * 
  * @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
  * 
  * @apiSuccessExample {json} Success-Response:
  * {
  *      "error": false,
  *      "message": "User created Successfully",
  *       "status": 200,
  *       "data": {
  *           "userId": "dTGZ7N9AF",
  *           "firstName": "gopala",
  *           "lastName": "krishnan",
  *           "email": "vgk2@gmail.com",
  *           "createdOn": "2019-08-11T08:22:23.000Z",
  *           "mobile": "123123123",
  *           "username":'admin_asda'
  *           "_id": "5cf235bf4545513efcf4923e",
  *           "__v": 0
  *        }
  *  }
  * 
  * @apiErrorExample  {json} Error- Response
  * {
  *       "error":true,
  *       "message":"User Already Exists",
  *       "status":500,
  *        "data":null
  * }
  */

    app.get(`${baseUrl}/getSingleUser/:userId`, userController.getSingleUserFn)

    /**
* @apiGroup Users
* @apiVersion 0.0.1
* @api {GET} /api/v1/users/getSingleUser/:userId Get data for single user
*     
* @apiParam {String} userId userId for whom the details needs to be retrieved. (body Params) (required)
* 
* @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
* 
* @apiSuccessExample {json} Success-Response:
* {
    "error": false,
    "message": "user details retrieved successfully",
    "status": 200,
    "data": {
        "userId": "qgji-CxF5",
        "firstName": "qwe",
        "lastName": "qwe",
        "email": "qwe@gmail.com",
        "createdOn": "2019-08-11T07:47:29.000Z",
        "mobile": "312123123",
        "_id": "5d4fc811f059243cc8e3c290",
        "userName": "qwe",
        "__v": 0
    }
}
* 
* @apiErrorExample  {json} Error- Response
* {
*       "error":true,
*       "message":"User Not Available",
*       "status":500,
*        "data":null
* }
*/

    app.get(`${baseUrl}/getAllUsers/forAdmin`, userController.getAllUsersForAdminFn)

       /**
* @apiGroup Users
* @apiVersion 0.0.1
* @api {GET} /api/v1/users/getAllUsers/forAdmin get All users List
*     
* @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
* 
* @apiSuccessExample {json} Success-Response:
* {
    "error": false,
    "message": "user details retrieved successfully",
    "status": 200,
    "data": {
        "userId": "qgji-CxF5",
        "firstName": "qwe",
        "lastName": "qwe",
        "email": "qwe@gmail.com",
        "createdOn": "2019-08-11T07:47:29.000Z",
        "mobile": "312123123",
        "_id": "5d4fc811f059243cc8e3c290",
        "userName": "qwe",
        "__v": 0
    }
}
* 
* @apiErrorExample  {json} Error- Response
* {
*       "error":true,
*       "message":"User Not Available",
*       "status":500,
*        "data":null
* }
*/

}