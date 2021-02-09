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
router.use("/font-awesome", express.static(__dirname + "/../../client/node_modules/@fortawesome/fontawesome-free"));


router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.post("/news", addNews);
router.get("/getNews", getNews);



function addNews(req: express.Request, res: express.Response):void {
    //console.log for debug
    console.log(req.body)

    const header: string = req.body.header;
    const text: string = req.body.text;
    const username: string = req.body.username

    // make array data with user data
    const data: [string, string, string] = [
        header,
        username,
        text
    ];

    const query: string = "INSERT INTO news (header, username, text)" + "VALUES (?, ?, ?);";

    connection.query(query, data, (err: MysqlError) => {
        if (err) {
            res.status(500).send({
                message: 'Datenbankverbindung ist fehlgeschlagen',
            })
        } else {
            res.status(201).send({
                message: 'New News created'
            })
        }
    })


}

function getNews(req: express.Request, res: express.Response):void {

    const query: string ="Select header, username, text, DATE_FORMAT (date, '%e.%c.%Y %H:%i') date FROM news ORDER BY date DESC;";

    connection.query(query, (err: mysql.MysqlError | null, rows: any) => {
        if (err === null) {

            let news: News [] = [];

            for (const row of rows) {
                news.push( new News(
                    row.header,
                    row.username,
                    row.text,
                    row.news_id,
                    row.date,
                ));
            }
        }
        res.status(200);
        res.send({
            news,
        })
        console.log(news)
    })
}