import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let MenuConfigSchema = new Schema({
    level: {type: Number, default: 0},
    first: {type: String, default: null},
    second: {type: String, default: null},
    name: {type: String},
    url: {type: String},
    iconClass: {type: String},
    index: {type: Number}
}, {
    timestamps: true
});

mongoose.model('MenuConfig', MenuConfigSchema);
