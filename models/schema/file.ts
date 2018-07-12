import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let FileSchema = new Schema({
    originalName: {type: String},
    mimeType: {type: String},
    path: {type: String},
    size: {type: String}
}, {
    timestamps: true
});

mongoose.model('Files', FileSchema);
