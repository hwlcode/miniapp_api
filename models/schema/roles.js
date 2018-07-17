"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RolesSchema = new Schema({
    name: { type: String, default: null },
    roles: [{ type: Schema.Types.ObjectId, ref: 'MenuConfig' }],
    desc: { type: String, default: null }
}, {
    timestamps: true
});
mongoose.model('Roles', RolesSchema);
//# sourceMappingURL=roles.js.map