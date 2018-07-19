import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let EmailSeviceSchema = new Schema({
    ip: {type: String},
    port: {type: Number},
    senderEmail: {type: String},
    senderName: {type: String},
    senderPassword: {type: String}
}, {
    timestamps: true
});

mongoose.model('EmailService', EmailSeviceSchema);
