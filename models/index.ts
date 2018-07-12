import * as mongoose from 'mongoose';

let db = '';
if (process.env.NODE_ENV === 'production') {
    db = 'mongodb://127.0.0.1:27027/minappdeals';
}else{
    db = 'mongodb://127.0.0.1:27017/minappdeals';
}

(mongoose as any).Promise = global.Promise;
mongoose.connect(db, err => {
    if (err) {
        console.log('connect to %s error: ', db, err.message);
        process.exit(1);
    }
});

require('./schema/file');
require('./schema/deals');

export const FilesModel = mongoose.model('Files');
export const DealsModel = mongoose.model('Deals');


