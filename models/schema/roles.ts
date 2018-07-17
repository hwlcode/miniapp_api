import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let RolesSchema = new Schema({
    name: {type: String, default: null},
    roles: [{type: Schema.Types.ObjectId, ref: 'MenuConfig'}],
    desc: {type: String, default: null}
}, {
    timestamps: true
});

mongoose.model('Roles', RolesSchema);
