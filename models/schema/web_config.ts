import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let WebConfigSchema = new Schema({
    level: {type: Number, default: 0},
    name: {type: String},
    parent: {type: Number, default: 0},
    url: {type: String},
    iconClass: {type: String}
}, {
    timestamps: true
});

mongoose.model('WebConfig', WebConfigSchema);
