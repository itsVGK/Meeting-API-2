const express = require('express')
const appConfig = require('./../../config/appConfig')
const meetingController = require('./../controllers/meetingController')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meet`

    app.post(`${baseUrl}/save`, meetingController.saveMeetingFn)


    /**
* @apiGroup Meeting
* @apiVersion 0.0.1
* @api {POST} /api/v1/meet/save Save Meeting

 * @apiParam {String} userId userId of the User. (body Params) (required)
  * @apiParam {String} title Title of the meeting. (body Params) (required)
  * @apiParam {String} start Meeting Start date (body Params) (required)
  * @apiParam {String} end Meeting end date. (body Params) (required)
  * @apiParam {String} colorp RBG Primary. (body Params) (required)
  * @apiParam {String} colors RBG Secondary. (body Params) (required)
  * @apiParam {String} draggable whether changes can be made by dragging the event. (body Params) (required)
  * @apiParam {String} rbstart resizable before start. (body Params) (required)
  * @apiParam {String} rbend resizable before end. (body Params) (required)
  * @apiParam {String} createdBy by whom meeting has been created. (body Params) (required)
  * @apiParam {String} meetingId meeting id if available to update existing event. (body Params) 
  * 
* @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
* 
* @apiSuccessExample {json} Success-Response:
* {
{
    "error": false,
    "message": "meeting created successfully",
    "status": 200,
    "data": {
        "meetingId": "DexFV56LN",
        "_id": "5d5674e69a4ec70f589c8032",
        "userId": "1231321231",
        "createdBy": "\"qgji-CxF5\"",
        "title": "dfa",
        "start": "2019-08-11T18:29:59.000Z",
        "end": "2019-08-10T18:30:00.000Z",
        "draggable": true,
        "resizable": {
            "beforeStart": true,
            "afterEnd": true
        },
        "__v": 0
    }
}
* 
* @apiErrorExample  {json} Error- Response
* {
*       "error":true,
*       "message":"unable to update the meeting",
*       "status":400,
*        "data":null
* }
*/

    app.get(`${baseUrl}/getAllEvent/byUser/:userId`, meetingController.getAllEventsByUserFn)


    /**
* @apiGroup Meeting
* @apiVersion 0.0.1
* @api {GET} /api/v1/meet/getAllEvent/byUser/:userId Events related to user

* @apiParam {String} userId userId for whom the details needs to be retrieved. (body Params) (required)

* @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
* 
* @apiSuccessExample {json} Success-Response:
* {
{
    "error": false,
    "message": "meeting details retrieved successfully",
    "status": 200,
    "data": {
       {
            "color": {
                "primary": "#49856f",
                "secondary": "#FAE3E3"
            },
            "resizable": {
                "beforeStart": true,
                "afterEnd": true
            },
            "meetingId": "g056GarnV",
            "_id": "5d55024fe5a247451c9605a9",
            "userId": "qgji-CxF5",
            "createdBy": "xLE6cz_Xw",
            "title": "sample one",
            "start": "2019-08-15T11:00:00.000Z",
            "end": "2019-08-18T22:59:00.000Z",
            "draggable": true,
            "__v": 0
        }
    }
}
* 
* @apiErrorExample  {json} Error- Response
* {
*       "error":true,
*       "message":"no events available for user",
*       "status":400,
*        "data":null
* }
*/

    app.delete(`${baseUrl}/delete/meet/:meetId`, meetingController.deleteMeetingFn)

    /**
* @apiGroup Meeting
* @apiVersion 0.0.1
* @api {DELETE} /api/v1/meet/delete/meet/:meetId Delete Meeting

* @apiParam {String} meetId meeting id to delete the existing event. (body Params) 
* 
* @apiSuccess {object} MyResponse Shows Error Status, Message, Http Status Code, result
* 
* @apiSuccessExample {json} Success-Response:
* {
{
"error": false,
"message": "meeting deleted successfully",
"status": 200,
"data": {
    "color": {
        "primary": "#49856f",
        "secondary": "#FAE3E3"
    },
    "resizable": {
        "beforeStart": true,
        "afterEnd": true
    },
    "meetingId": "g056GarnV",
    "_id": "5d55024fe5a247451c9605a9",
    "userId": "qgji-CxF5",
    "createdBy": "xLE6cz_Xw",
    "title": "sample one",
    "start": "2019-08-15T11:00:00.000Z",
    "end": "2019-08-18T22:59:00.000Z",
    "draggable": true,
    "__v": 0"meetingId": "DexFV56LN",
    "_id": "5d5674e69a4ec70f589c8032",
    "userId": "1231321231",
    "createdBy": "\"qgji-CxF5\"",
    "title": "dfa",
    "start": "2019-08-11T18:29:59.000Z",
    "end": "2019-08-10T18:30:00.000Z",
    "draggable": true,
    "resizable": {
        "beforeStart": true,
        "afterEnd": true
    },
    "__v": 0
}
}
* 
* @apiErrorExample  {json} Error- Response
* {
*       "error":true,
*       "message":"Meeting Id not available",
*       "status":400,
*        "data":null
* }
*/

    app.get(`${baseUrl}/getAllEvent/forAdmin`, meetingController.getAllEventForAdmin)

    app.get(`${baseUrl}/sendMail`, meetingController.sendMail)

}