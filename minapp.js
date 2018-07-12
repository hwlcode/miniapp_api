"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function miniApp(app) {
    app.get('/get', function (req, res) {
        res.json({
            msg: 'code'
        });
    });
}
exports.miniApp = miniApp;
//# sourceMappingURL=minapp.js.map