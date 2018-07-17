"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var ObjectId = require('mongodb').ObjectID;
function webConfigAPi(app) {
    var _this = this;
    // 保存菜单
    app.post('/save_web_config', function (req, res) {
        var body = req.body;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(body.id == undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.MenuConfigModel.create(body)];
                    case 1:
                        _a.sent();
                        res.json({
                            code: 0,
                            msg: '保存成功'
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        id = new ObjectId(body.id);
                        return [4 /*yield*/, models_1.MenuConfigModel.findByIdAndUpdate(id, {
                                $set: {
                                    level: body.level,
                                    first: body.first,
                                    second: body.second,
                                    name: body.name,
                                    url: body.url,
                                    iconClass: body.iconClass,
                                    index: body.index
                                }
                            }).exec()];
                    case 3:
                        _a.sent();
                        res.json({
                            code: 0,
                            msg: '保存成功'
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
    });
    // 获取所有一级菜单
    app.get('/get_first_list', function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var menu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.MenuConfigModel.find({
                            level: 0
                        }).sort({ index: 1 }).exec()];
                    case 1:
                        menu = _a.sent();
                        res.json({
                            code: 0,
                            msg: 'success',
                            data: menu
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // 获取二级菜单
    app.get('/get_second_list', function (req, res) {
        var id = req.query.id;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var menu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.MenuConfigModel.find({ first: id, level: 1 }).sort({ index: 1 }).exec()];
                    case 1:
                        menu = _a.sent();
                        res.json({
                            code: 0,
                            msg: 'success',
                            data: menu
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // 菜取所有菜单
    app.get('/get_all_menu', function (req, res) {
        var menu = [];
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var allMenu, first, second, third;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.MenuConfigModel.find().sort({ index: 1 }).exec()];
                    case 1:
                        allMenu = _a.sent();
                        first = allMenu.filter(function (menu) { return menu['level'] == 0; });
                        second = allMenu.filter(function (menu) { return menu['level'] == 1; });
                        third = allMenu.filter(function (menu) { return menu['level'] == 2; });
                        first.map(function (m) {
                            var obj = {};
                            var child = second.filter(function (s) { return s['first'] == m._id; });
                            var secondArr = [];
                            child.map(function (s) {
                                var newObj = {};
                                var level3 = third.filter(function (t) { return t['second'] == s._id; });
                                newObj.second = s;
                                newObj.child = level3;
                                secondArr.push(newObj);
                            });
                            obj.first = m;
                            obj.child = secondArr;
                            menu.push(obj);
                        });
                        res.json({
                            code: 0,
                            msg: 'success',
                            data: menu
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // 删除菜单
    app.get('/delete_the_menu/:id', function (req, res) {
        var id = new ObjectId(req.params.id);
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var second, third;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.MenuConfigModel.find({
                            first: req.params.id,
                            level: 1
                        }).exec()];
                    case 1:
                        second = _a.sent();
                        return [4 /*yield*/, models_1.MenuConfigModel.find({
                                second: req.params.id,
                                level: 2
                            }).exec()];
                    case 2:
                        third = _a.sent();
                        if (!(second.length > 0 || third.length > 0)) return [3 /*break*/, 3];
                        res.json({
                            code: 1000,
                            msg: '请确认该菜单是否包含子菜单！'
                        });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, models_1.MenuConfigModel.findOne({ _id: id }).remove()];
                    case 4:
                        _a.sent();
                        res.json({
                            code: 0,
                            msg: 'success'
                        });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    });
    // 获取菜单数据
    app.get('/get_menu_by_id/:id', function (req, res) {
        var id = new ObjectId(req.params.id);
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var menu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.MenuConfigModel.findOne({ _id: id }).exec()];
                    case 1:
                        menu = _a.sent();
                        res.json({
                            code: 0,
                            msg: 'success',
                            data: menu
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // 获取所有菜单不分类
    app.get('/get_all_menu_no_cate', function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var menu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.MenuConfigModel.find().sort({ index: 1 }).exec()];
                    case 1:
                        menu = _a.sent();
                        res.json({
                            code: 0,
                            msg: 'success',
                            data: menu
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    });
}
exports.webConfigAPi = webConfigAPi;
//# sourceMappingURL=web_config_api.js.map