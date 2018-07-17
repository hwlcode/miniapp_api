import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let AdminUsersSchema = new Schema({
    nickname: {type: String},
    phone: {type: String},
    email: {type: String},
    role: {type: Schema.Types.ObjectId, ref: 'Roles'},
    status: {type: Boolean}
}, {
    timestamps: true
});

mongoose.model('AdminUsers', AdminUsersSchema);
