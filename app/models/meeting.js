'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let meetingSchema = new Schema({
    meetingId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    userId: {
        type: String
    },
    createdBy: {
        type: String
    },
    title: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    color: {
        primary: {
            type: String
        },
        secondary: {
            type: String
        }
    },
    draggable: {
        type: Boolean
    },
    resizable: {
        beforeStart: {
            type: Boolean
        },
        afterEnd: {
            type: Boolean
        }
    }
})


mongoose.model('Meet', meetingSchema);