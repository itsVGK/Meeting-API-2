const mongoose = require('mongoose');
const response = require('./../libs/responseLib')
const shortId = require('shortid')
const check = require('./../libs/checkLib')

const MeetingModel = mongoose.model('Meet')

const mail = require('./../libs/mail')

let saveMeetingFn = (req, res) => {
    let saveMeeting = () => {
        return new Promise((resolve, reject) => {
            MeetingModel.findOne({ 'meetingId': req.body.meetingId })
                .exec((error, result) => {
                    if (error)
                        reject(response.generate(true, 'unable to retrieve meeting info', 400, null))
                    else if (check.isEmpty(result)) {
                        let newEvent = new MeetingModel({
                            meetingId: shortId.generate(),
                            userId: req.body.userId,
                            createdBy: req.body.createdBy,
                            title: req.body.title,
                            start: req.body.start,
                            end: req.body.end,
                            color: {
                                primary: req.body.colorP,
                                secondary: req.body.colorS
                            },
                            draggable: req.body.draggable,
                            resizable: {
                                beforeStart: req.body.rbstart,
                                afterEnd: req.body.raend
                            }
                        })
                        newEvent.save((errRet, resRet) => {
                            if (errRet) {
                                reject(response.generate(true, 'unable to create meeting', 400, null))
                            } else if (check.isEmpty(resRet)) {
                                reject(response.generate(true, 'meeting list is empty', 400, null))
                            } else[
                                resolve(response.generate(false, 'meeting created successfully', 200, resRet))
                            ]
                        })
                    } else {
                        MeetingModel.updateOne({ 'meetingId': req.body.meetingId }, req.body, { multi: true })
                            .exec((errUp, resUp) => {
                                if (errUp)
                                    reject(response.generate(true, 'error while updatating meeting', 400, null))
                                else if (check.isEmpty(resUp))
                                    reject(response.generate(true, 'unable to update the meeting', 400, null))
                                else
                                    resolve(response.generate(false, 'meeting updated successfully', 200, resUp))
                            })
                    }
                })



        })
    }

    saveMeeting()
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })

}

let getAllEventsByUserFn = (req, res) => {
    let getUserEvent = () => {
        return new Promise((resolve, reject) => {
            MeetingModel.find({ 'userId': req.params.userId }, { _id: 0, __v: 0, userId: 0 })
                .exec((errRet, resRet) => {
                    if (errRet) {
                        reject(response.generate(true, 'unable to get the user', 400, null))
                    } else if (check.isEmpty(resRet)) {
                        reject(response.generate(true, 'no events available for user', 400, null))
                    } else {
                        resolve(resRet)
                    }
                })
        })
    }

    getUserEvent()
        .then((resolve) => {
            res.send(response.generate(false, 'Meeting details were retrieved successfully', 200, resolve))
        })
        .catch((err) => {
            res.send(err)
        })
}

let deleteMeetingFn = (req, res) => {
    MeetingModel.findOneAndDelete({ 'meetingId': req.params.meetId })
        .exec((errRet, resRet) => {
            if (errRet) {
                res.send(response.generate(true, 'unable to delete the meeting', 400, null))
            } else if (check.isEmpty(resRet)) {
                res.send(response.generate(true, 'Meeting Id not available', 400, null))
            } else {
                res.send(response.generate(false, 'meeting deleted successfully', 200, resRet))
            }
        })
}

let getAllEventForAdmin = (req, res) => {

    MeetingModel.find()
        .exec((err, res1) => {
            if (err)
                res.send(response.generate(true, 'unable to retrieve meeting details', 400, null))
            else if (check.isEmpty(res1))
                res.send(response.generate(true, 'no meeting details available', 400, null))
            else
                res.send(response.generate(false, 'Meeting details retrieved successfully', 200, res1))
        })

}

let sendMail = (req, res) => {
    console.log('sending mail')
    mail.mailConfig().then(res.send(response.generate(false, 'sent', 200, 'ok')))
        .catch(res.send(response.generate('true', 'not sent', 400, null)))
}

module.exports = {
    saveMeetingFn: saveMeetingFn,
    getAllEventsByUserFn: getAllEventsByUserFn,
    deleteMeetingFn: deleteMeetingFn,
    getAllEventForAdmin: getAllEventForAdmin,
    sendMail: sendMail
}