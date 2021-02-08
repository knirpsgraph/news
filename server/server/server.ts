import * as mysql from "mysql";
import * as express from 'express';


import {Config} from "../config/config";
import {News} from "../model/mod";
import {Connection, MysqlError} from "mysql";

//deklariere router and connenction
const router: express.Express = express();
const connection: Connection = mysql.createConnection(Config.mysqlOptions)

/******************************************************************************
 * Starte Server
 ******************************************************************************/

router.listen(8089, () => {
    console.log('Server started: http://localhost:8089');
    connection.connect((err: MysqlError) => {
        if (err) {
            console.log('Database Connection failed ' + err)
        } else {
            console.log('Database is connected');
        }
    });
});

router.use("/", express.static(__dirname + "/../../client/views"));
router.use("/bootstrap", express.static(__dirname + "/../../client/node_modules/bootstrap/dist"));
router.use("/styles", express.static(__dirname + "/../../client/css"));
router.use("/script", express.static(__dirname + "/../../client/javascript"));
router.use("/jquery", express.static(__dirname + "/../../client/node_modules/jquery/dist"));
router.use("/assets", express.static(__dirname + "/../../client/assets"));


router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.post("/news", addNews);



function addNews(req: express.Request, res: express.Response):void {
    //console.log for debug
    console.log(req.body)
}