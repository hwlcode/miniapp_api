import {EmailServiceModel} from '../models';

const ObjectId = require('mongodb').ObjectID;

function emailServiceApi(app) {
    // 保存与编辑
    app.post('/save_email_config', (req, res) => {
        const body = req.body;
        (async () => {
            if (body.id == undefined) {
                let data = await EmailServiceModel.create(body);
                res.json({
                    code: 0,
                    msg: '保存成功',
                    data: data._id
                })
            } else {
                const id = new ObjectId(body.id);
                await EmailServiceModel.findByIdAndUpdate(id, {$set: {
                    ip: body.ip,
                    port: body.port,
                    senderEmail: body.senderEmail,
                    senderName: body.senderName,
                    senderPassword: body.senderPassword
                }}).exec();

                res.json({
                    code: 0,
                    msg: '更新成功'
                })
            }
        })();
    });

    // 查询单个产品
    app.get('/get_email_config_msg', (req, res) => {
        (async () => {
            const emailConfig = await EmailServiceModel.find().exec();
            res.json({
                code: 0,
                msg: 'success',
                data: emailConfig
            })
        })();
    });
}

export {emailServiceApi}
