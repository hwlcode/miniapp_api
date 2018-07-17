import {dealsApi} from './admin/deals';
import {webConfigAPi} from "./admin/web_config_api";
import {rolesApi} from "./admin/roles";

function webApi(app) {
    // 秒杀产品
    dealsApi(app);
    // 网站配置
    webConfigAPi(app);
    //权限配置
    rolesApi(app);
}

export {webApi}
