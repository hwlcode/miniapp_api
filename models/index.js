"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var db = '';
if (process.env.NODE_ENV === 'production') {
    db = 'mongodb://127.0.0.1:27027/minappdeals';
}
else {
    db = 'mongodb://127.0.0.1:27017/minappdeals';
}
mongoose.Promise = global.Promise;
mongoose.connect(db, function (err) {
    if (err) {
        console.log('connect to %s error: ', db, err.message);
        process.exit(1);
    }
});
require('./schema/file');
require('./schema/deals');
exports.FilesModel = mongoose.model('Files');
exports.DealsModel = mongoose.model('Deals');
//# sourceMappingURL=index.js.map