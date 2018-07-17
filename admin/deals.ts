import {DealsModel} from '../models';
const ObjectId = require('mongodb').ObjectID;

function dealsApi(app) {
    // 保存秒杀产品
    app.post('/saveDeal', (req, res) => {
        const body = req.body;
        (async () => {
            if (body.id == undefined) {
                await DealsModel.create(body);
                res.json({
                    code: 0,
                    msg: '保存成功'
                })
            } else {
                const id = new ObjectId(body.id);
                await DealsModel.findByIdAndUpdate(id, {$set: {
                    pro_name: body.pro_name,
                    old_price: body.old_price,
                    pro_price: body.pro_price,
                    unit: body.unit,
                    avatar: body.avatar,
                    deals: body.deals,
                    dealTime: body.dealTime,
                    desc: body.desc
                }}).exec();

                res.json({
                    code: 0,
                    msg: '更新成功'
                })
            }
        })();
    });

    // 删除秒杀产品
    app.get('/deals/del/:id', (req, res) => {
        const id = new ObjectId(req.params.id);

        let page = parseInt(req.query.q) || 1;
        let limit = 15;
        let skip = (page - 1) * limit;

        (async () => {
            // 删除
            await DealsModel.update({_id: id}, {
                delete: 1
            });
            // 查询新数据
            const list = await DealsModel.find({delete: 0}).populate({
                path: 'avatar',
                select: 'path'
            }).skip(skip).limit(limit).sort({
                createdAt: -1
            });
            const count = await DealsModel.find({delete: 0}).count();
            res.json({
                code: 0,
                msg: 'success',
                total: count,
                data: list
            });
        })();
    });

    // 秒杀产品列表
    app.get('/deals/list', (req, res) => {
        let page = parseInt(req.query.q) || 1;
        let limit = 15;
        let skip = (page - 1) * limit;
        (async () => {
            let opt = {
                path: 'avatar',
                select: 'path'
            };
            const list = await DealsModel.find({delete: 0}).populate(opt).skip(skip).limit(limit).sort({
                createdAt: -1
            });
            const count = await DealsModel.find({delete: 0}).count();
            res.json({
                code: 0,
                msg: 'success',
                total: count,
                data: list
            });
        })();
    });

    // 查询单个产品
    app.get('/deals/search/:id', (req, res) => {
        let id = new ObjectId(req.params.id);
        (async () => {
            const deal = await DealsModel.findOne({_id: id}).populate({
                path: 'avatar',
                select: 'path'
            }).exec();
            res.json({
                code: 0,
                msg: 'success',
                data: deal
            })
        })();
    });
}

export {dealsApi}
