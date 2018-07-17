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
function rolesApi(app) {
    var _this = this;
    // 保存与编辑
    app.post('/save_role', function (req, res) {
        var body = req.body;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(body.id == undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.RoleModel.create(body)];
                    case 1:
                        _a.sent();
                        res.json({
                            code: 0,
                            msg: '保存成功'
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        id = new ObjectId(body.id);
                        return [4 /*yield*/, models_1.RoleModel.findByIdAndUpdate(id, { $set: {
                                    name: body.name,
                                    roles: body.roles,
                                    desc: body.desc
                                } }).exec()];
                    case 3:
                        _a.sent();
                        res.json({
                            code: 0,
                            msg: '更新成功'
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
    });
    // 删除
    app.get('/roles/del/:id', function (req, res) {
        var id = new ObjectId(req.params.id);
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // 删除
                    return [4 /*yield*/, models_1.RoleModel.findOne({ _id: id }).remove()];
                    case 1:
                        // 删除
                        _a.sent();
                        return [4 /*yield*/, models_1.RoleModel.find().populate({
                                path: 'roles',
                                select: '_id name'
                            }).sort({
                                createdAt: -1
                            })];
                    case 2:
                        list = _a.sent();
                        res.json({
                            code: 0,
                            msg: 'success',
                            data: list
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // 列表
    app.get('/roles/list', function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var opt, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opt = {
                            path: 'roles',
                            select: '_id name'
                        };
                        return [4 /*yield*/, models_1.RoleModel.find().populate(opt).sort({
                                createdAt: -1
                            })];
                    case 1:
                        list = _a.sent();
                        res.json({
                            code: 0,
                            msg: 'success',
                            data: list
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    // 查询单个产品
    app.get('/roles/search/:id', function (req, res) {
        var id = new ObjectId(req.params.id);
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.RoleModel.findOne({ _id: id }).populate({
                            path: 'roles',
                            select: '_id name'
                        }).exec()];
                    case 1:
                        role = _a.sent();
                        res.json({
                            code: 0,
                            msg: 'success',
                            data: role
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    });
}
exports.rolesApi = rolesApi;
//# sourceMappingURL=roles.js.map