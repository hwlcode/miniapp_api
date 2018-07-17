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
mongoose.connect(db, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('connect to %s error: ', db, err.message);
        process.exit(1);
    }
});
require('./schema/file');
require('./schema/deals');
require('./schema/web_config');
require('./schema/menu_config');
require('./schema/roles');
require('./schema/admin_user');
exports.FilesModel = mongoose.model('Files');
exports.DealsModel = mongoose.model('Deals');
exports.WebConfigModel = mongoose.model('WebConfig');
exports.MenuConfigModel = mongoose.model('MenuConfig');
exports.RoleModel = mongoose.model('Roles');
exports.AdminUsersModel = mongoose.model('AdminUsers');
//# sourceMappingURL=index.js.map