import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let DealsSchema = new Schema({
    pro_name: {type: String},
    old_price: {type: String},
    pro_price: {type: String},
    unit: {type: String},
    desc: {type: String},
    avatar: {type: Schema.Types.ObjectId, ref: 'Files'},
    deals: [
        {
            title: {type: String},
            content: {type: String},
            background: {type: String}
        }
    ],
    dealTime: [],
    delete: {type: Number, default: 0}
}, {
    timestamps: true
});

mongoose.model('Deals', DealsSchema);
