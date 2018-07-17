import {MenuConfigModel} from '../models';

const ObjectId = require('mongodb').ObjectID;

function webConfigAPi(app) {
    // 保存菜单
    app.post('/save_web_config', (req, res) => {
        const body = req.body;
        (async () => {
            if (body.id == undefined) {
                await MenuConfigModel.create(body);
                res.json({
                    code: 0,
                    msg: '保存成功'
                });
            } else {
                const id = new ObjectId(body.id);
                await MenuConfigModel.findByIdAndUpdate(id, {
                    $set: {
                        level: body.level,
                        first: body.first,
                        second: body.second,
                        name: body.name,
                        url: body.url,
                        iconClass: body.iconClass,
                        index: body.index
                    }
                }).exec();

                res.json({
                    code: 0,
                    msg: '保存成功'
                });
            }

        })();
    });

    // 获取所有一级菜单
    app.get('/get_first_list', (req, res) => {
        (async () => {
            const menu = await MenuConfigModel.find({
                level: 0
            }).sort({index: 1}).exec();
            res.json({
                code: 0,
                msg: 'success',
                data: menu
            });
        })();
    });

    // 获取二级菜单
    app.get('/get_second_list', (req, res) => {
        const id = req.query.id;
        (async () => {
            const menu = await MenuConfigModel.find({first: id, level: 1}).sort({index: 1}).exec();
            res.json({
                code: 0,
                msg: 'success',
                data: menu
            });
        })();
    });

    // 菜取所有菜单
    app.get('/get_all_menu', (req, res) => {
        let menu: any = [];

        (async () => {
            const allMenu = await MenuConfigModel.find().sort({index: 1}).exec();
            let first = allMenu.filter(menu => menu['level'] == 0);
            let second = allMenu.filter(menu => menu['level'] == 1);
            let third = allMenu.filter(menu => menu['level'] == 2);

            first.map(m => {
                let obj: any = {};
                let child = second.filter(s => s['first'] == m._id);

                let secondArr = [];
                child.map(s => {
                    let newObj: any = {};
                    let level3 = third.filter(t => t['second'] == s._id);

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
            })
        })();
    });

    // 删除菜单
    app.get('/delete_the_menu/:id', (req, res) => {
        const id = new ObjectId(req.params.id);
        (async () => {
            const second = await MenuConfigModel.find({
                first: req.params.id,
                level: 1
            }).exec();

            const third = await MenuConfigModel.find({
                second: req.params.id,
                level: 2
            }).exec();

            if (second.length > 0 || third.length > 0) {
                res.json({
                    code: 1000,
                    msg: '请确认该菜单是否包含子菜单！'
                })
            } else {
                await MenuConfigModel.findOne({_id: id}).remove();
                res.json({
                    code: 0,
                    msg: 'success'
                })
            }
        })();
    });

    // 获取菜单数据
    app.get('/get_menu_by_id/:id', (req, res) => {
        const id = new ObjectId(req.params.id);
        (async () => {
            const menu = await MenuConfigModel.findOne({_id: id}).exec();
            res.json({
                code: 0,
                msg: 'success',
                data: menu
            })
        })();
    });

    // 获取所有菜单不分类
    app.get('/get_all_menu_no_cate', (req, res) => {
        ( async () => {
            const menu = await MenuConfigModel.find().sort({index : 1}).exec();
            res.json({
                code: 0,
                msg: 'success',
                data: menu
            });
        })();
    });

}

export {webConfigAPi}
