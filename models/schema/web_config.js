"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var WebConfigSchema = new Schema({
    level: { type: Number, default: 0 },
    name: { type: String },
    parent: { type: Number, default: 0 },
    url: { type: String },
    iconClass: { type: String }
}, {
    timestamps: true
});
mongoose.model('WebConfig', WebConfigSchema);
//# sourceMappingURL=web_config.js.map