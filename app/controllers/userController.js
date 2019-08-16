const mongoose = require('mongoose');
const response = require('./../libs/responseLib')
const validate = require('./../libs/paramValidation')
const check = require('./../libs/checkLib')
const shortId = require('shortid')
const pwdLib = require('./../libs/passwordLib')

const UserModel = mongoose.model('User')

let loginFunction = (req, res) => {

    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ 'email': req.body.email.toLowerCase() })
                    .exec((err, userDetails) => {
                        if (err) {
                            reject(response.generate(true, 'unable to retrieve the user details', 400, null))
                        } else if (check.isEmpty(userDetails)) {
                            reject(response.generate(true, 'user Details are not available', 400, null));
                        } else {
                            resolve(userDetails);
                        }
                    })
            } else {
                reject(response.generate(true, 'email parameter missing', 400, null));
            }
        })
    }

    let validatePassword = (userDetails) => {
        return new Promise((resolve, reject) => {
            pwdLib.comparePwd(req.body.password, userDetails.password, (err, isMatch) => {
                if (err) {
                    reject(response.generate(true, 'Login Failed', 400, null));
                } else if (isMatch) {
                    let userObj = userDetails.toObject();
                    delete userObj.password;
                    resolve(userObj);
                } else {
                    reject(response.generate(true, 'Invalid Password', 400, null))
                }
            })
        })
    }

    findUser(req, res)
        .then(validatePassword)
        .then((resolve) => {
            res.send(response.generate(false, 'Logged in Successfully', 200, resolve))
        })
        .catch((err) => {
            res.send(err);
        })
}

let singupFunction = (req, res) => {

    let checkAndValidateinput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validate.Email(req.body.email)) {
                    reject(response.generate(true, 'Please provide Correct Email Format', 400, null))
                } else if (check.isEmpty(req.body.password)) {
                    reject(response.generate(true, 'Password Parameter missing', 400, null))
                } else {
                    resolve(req)
                }
            } else {
                reject(response.generate(true, 'Email Parameter Missing', 400, null));
            }
        })
    }

    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retUser) => {
                    if (err)
                        reject(response.generate(true, 'Unable to check the user status', 400, null))
                    else if (check.isEmpty(retUser)) {
                        let newUser = new UserModel({
                            userId: shortId.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            mobile: req.body.mobile,
                            userName: req.body.userName,
                            password: pwdLib.hashPwd(req.body.password),
                            createdOn: new Date().toString()
                        })
                        newUser.markModified();
                        newUser.save((error, retres) => {
                            if (error)
                                reject(response.generate(true, 'unable to save the user', 400, null))
                            else if (check.isEmpty(retres))
                                reject(response.generate(true, 'user list is empty', 400, null))
                            else {
                                let user = newUser.toObject();
                                resolve(user)
                            }
                        })
                    } else {
                        reject(response.generate(true, 'user Already Exists', 400, null))
                    }
                })
        })
    }

    checkAndValidateinput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            console.log('success')
            res.send(response.generate(false, 'user Created Successfully', 200, resolve))
        })
        .catch((err) => {
            res.send(err)
        })

}

let getSingleUserFn = (req, res) => {
    if (req.params.userId) {
        UserModel.findOne({ 'userId': req.params.userId })
            .exec((err, res1) => {
                if (err) {
                    res.send(response.generate(true, 'error occured while fetching user', 400, null))
                } else if (check.isEmpty(res1)) {
                    res.send(response.generate(true, 'User Not Available', 400, null))
                } else {
                    res.send(response.generate(false, 'user details retrieved successfully', 200, res1))
                }
            })
    } else {
        res.send(response.generate(true, 'userId not available', 400, null))
    }
}

let getAllUsersForAdminFn = (req, res) => {
    UserModel.find()
        .exec((err, res1) => {
            if (err) {
                res.send(response.generate(true, 'error occured while fetching user', 400, null))
            } else if (check.isEmpty(res1)) {
                res.send(response.generate(true, 'User details Not Available', 400, null))
            } else {
                res.send(response.generate(false, 'user details retrieved successfully', 200, res1))
            }
        })
}


module.exports = {
    loginFunction: loginFunction,
    singupFunction: singupFunction,
    getSingleUserFn: getSingleUserFn,
    getAllUsersForAdminFn: getAllUsersForAdminFn
}