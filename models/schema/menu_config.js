"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MenuConfigSchema = new Schema({
    level: { type: Number, default: 0 },
    first: { type: String, default: null },
    second: { type: String, default: null },
    name: { type: String },
    url: { type: String },
    iconClass: { type: String },
    index: { type: Number }
}, {
    timestamps: true
});
mongoose.model('MenuConfig', MenuConfigSchema);
//# sourceMappingURL=menu_config.js.map