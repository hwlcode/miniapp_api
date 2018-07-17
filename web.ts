import {dealsApi} from './admin/deals';
import {webConfigAPi} from "./admin/web_config_api";
import {rolesApi} from "./admin/roles";
import {adminUsersApi} from "./admin/admin_user";

function webApi(app) {
    // 秒杀产品
    dealsApi(app);
    // 网站配置
    webConfigAPi(app);
    // 权限配置
    rolesApi(app);
    // 后台用户
    adminUsersApi(app);
}

export {webApi}
