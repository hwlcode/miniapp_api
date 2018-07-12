"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var FileSchema = new Schema({
    originalName: { type: String },
    mimeType: { type: String },
    path: { type: String },
    size: { type: String }
}, {
    timestamps: true
});
mongoose.model('Files', FileSchema);
//# sourceMappingURL=file.js.map