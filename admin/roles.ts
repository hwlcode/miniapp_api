import {RoleModel} from '../models';

const ObjectId = require('mongodb').ObjectID;

function rolesApi(app) {
    // 保存与编辑
    app.post('/save_role', (req, res) => {
        const body = req.body;
        (async () => {
            if (body.id == undefined) {
                await RoleModel.create(body);
                res.json({
                    code: 0,
                    msg: '保存成功'
                })
            } else {
                const id = new ObjectId(body.id);
                await RoleModel.findByIdAndUpdate(id, {$set: {
                    name: body.name,
                    roles: body.roles,
                    desc: body.desc
                }}).exec();

                res.json({
                    code: 0,
                    msg: '更新成功'
                })
            }
        })();
    });

    // 删除
    app.get('/roles/del/:id', (req, res) => {
        const id = new ObjectId(req.params.id);

        (async () => {
            // 删除
            await RoleModel.findOne({_id: id}).remove();
            // 查询新数据
            const list = await RoleModel.find().populate({
                path: 'roles',
                select: '_id name'
            }).sort({
                createdAt: -1
            });
            res.json({
                code: 0,
                msg: 'success',
                data: list
            });
        })();
    });

    // 列表
    app.get('/roles/list', (req, res) => {
        (async () => {
            let opt = {
                path: 'roles',
                select: '_id name'
            };
            const list = await RoleModel.find().populate(opt).sort({
                createdAt: -1
            });

            res.json({
                code: 0,
                msg: 'success',
                data: list
            });
        })();
    });

    // 查询单个产品
    app.get('/roles/search/:id', (req, res) => {
        let id = new ObjectId(req.params.id);
        (async () => {
            const role = await RoleModel.findOne({_id: id}).populate({
                path: 'roles',
                select: '_id name'
            }).exec();
            res.json({
                code: 0,
                msg: 'success',
                data: role
            })
        })();
    });
}

export {rolesApi}
