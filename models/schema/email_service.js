"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var EmailSeviceSchema = new Schema({
    ip: { type: String },
    port: { type: Number },
    senderEmail: { type: String },
    senderName: { type: String },
    senderPassword: { type: String }
}, {
    timestamps: true
});
mongoose.model('EmailService', EmailSeviceSchema);
//# sourceMappingURL=email_service.js.map