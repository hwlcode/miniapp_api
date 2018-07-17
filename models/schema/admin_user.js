"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AdminUsersSchema = new Schema({
    nickname: { type: String },
    phone: { type: String },
    email: { type: String },
    role: { type: Schema.Types.ObjectId, ref: 'Roles' },
    status: { type: Boolean }
}, {
    timestamps: true
});
mongoose.model('AdminUsers', AdminUsersSchema);
//# sourceMappingURL=admin_user.js.map