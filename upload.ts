import * as Models from './models';
import * as multer from 'multer';

const storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        //目录要手动创建
        cb(null, './public/uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "." + file.originalname.split('.')[1]);
    }
});
const upload = multer({
    storage: storage
});

function uploaderRouter(app){
    app.post('/upload', upload.single('file'), function (req, res, next) {
        const file = req.file;
        (async () => {
            var img = await Models.FilesModel.create({
                mimeType: file.mimetype,
                originalName: file.originalname,
                path: file.path.split('public')[1],
                size: file.size
            });
            res.send({ret_code: '0', id: img._id, path: img['path']});
        })();
    });
}

export {uploaderRouter}
