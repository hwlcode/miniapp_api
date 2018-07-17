import {AdminUsersModel} from '../models';

const ObjectId = require('mongodb').ObjectID;

function adminUsersApi(app) {
    // 保存与编辑
    app.post('/save_admin_user', (req, res) => {
        const body = req.body;
        (async () => {
            if (body.id == undefined) {
                await AdminUsersModel.create(body);
                res.json({
                    code: 0,
                    msg: '保存成功'
                })
            } else {
                const id = new ObjectId(body.id);
                await AdminUsersModel.findByIdAndUpdate(id, {$set: {
                    nickname: body.nickname,
                    phone: body.phone,
                    email: body.email,
                    role: body.role,
                    status: body.status
                }}).exec();

                res.json({
                    code: 0,
                    msg: '更新成功'
                })
            }
        })();
    });

    // 删除
    app.get('/admin_user/del/:id', (req, res) => {
        const id = new ObjectId(req.params.id);

        (async () => {
            // 删除
            await AdminUsersModel.findOne({_id: id}).remove();
            // 查询新数据
            const list = await AdminUsersModel.find().populate({
                path: 'role',
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
     app.get('/admin_user/list', (req, res) => {
        (async () => {
            let opt = {
                path: 'role',
                select: '_id name'
            };
            const list = await AdminUsersModel.find().populate(opt).sort({
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
    app.get('/admin_user/search/:id', (req, res) => {
        let id = new ObjectId(req.params.id);
        (async () => {
            const user = await AdminUsersModel.findOne({_id: id}).populate({
                path: 'role',
                select: '_id name'
            }).exec();
            res.json({
                code: 0,
                msg: 'success',
                data: user
            })
        })();
    });
}

export {adminUsersApi}
