import express from "express";
import userAgent from "express-useragent";
import methodOverride from "method-override";
import cors from "cors";
import session from "express-session";
import logger from "./helper/LogHelper";
import UtileHelper from "./helper/UtileHelper";
import { envExist } from "./helper/EnvHelper";
import { PageNotFoundException } from "./helper/ExceptionHelper";
import { userAgentLogMiddleware, webHelperMiddleware } from "./middlewares";
import rootRouter from "./routers/rootRouter";
const MySQLStore = require("express-mysql-session")(session);

const app = express();

envExist();
app.use(userAgent.express());
app.use(userAgentLogMiddleware);
// express로 post 요청을 할때 value를 전달하기 위해 사용 (bodyParser 와 같은 역할)
// express v4.16부터 내장 라이브러리가 되었기 때문에 따로 bodyParser를 설치하지 않아도 됩니다.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(cors());
// express로 put, delete를 사용하기위해 설정
app.use(methodOverride());
app.use(webHelperMiddleware);
app.use(session({
    secret: process.env.SESSION_ENCRYPT_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        createDatabaseTable: true,
        schema: {
            tableName: process.env.SESSION_TABLE_NAME,
            columnNames: {
                session_id: process.env.SESSION_ID,
                expires: process.env.SESSION_EXPIRES,
                data: process.env.SESSION_DATA,
            },
        },
    })
}));


app.use("/", rootRouter);

app.use((err, _, res, __) => res.sendError(err));
app.use("*", (_, res, __) => res.sendError(new PageNotFoundException()));

const serverIp = UtileHelper.getIp();

app.listen(process.env.PORT, () => {
    logger.debug("--------------------------------------------------");
    logger.debug("|              Start Express Server              |");
    logger.debug("--------------------------------------------------");
    serverIp.forEach(ip => logger.debug(`server address => http://${ip}:${process.env.PORT}`));
    logger.debug("--------------------------------------------------");
});
process.on("exit", () => logger.debug("백엔드가 종료되었습니다."));
process.on("SIGINT", () => process.exit());