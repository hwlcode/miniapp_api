import * as express from 'express';
import {webApi} from './web';
import {miniApp} from './minapp';
import {uploaderRouter} from "./upload";
import * as bodyParser from 'body-parser';

const app = express();
const apiRouter = express.Router();

//middleware
app.use(express.static('public')); //静态资源存放目录
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//router 允许跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// admin web api
webApi(apiRouter);
// min app api
miniApp(apiRouter);
// 上传
uploaderRouter(apiRouter);

app.use('/api/web', apiRouter);
app.use('/api/app', apiRouter);
app.use('/api/admin', apiRouter);

const server = app.listen(8000, 'localhost', () => {
    console.log('server is running at http://localhost:8000');
});
