"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deals_1 = require("./admin/deals");
var web_config_api_1 = require("./admin/web_config_api");
var roles_1 = require("./admin/roles");
function webApi(app) {
    // 秒杀产品
    deals_1.dealsApi(app);
    // 网站配置
    web_config_api_1.webConfigAPi(app);
    //权限配置
    roles_1.rolesApi(app);
}
exports.webApi = webApi;
//# sourceMappingURL=web.js.map