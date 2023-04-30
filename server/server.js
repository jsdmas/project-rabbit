import { join } from "path";
import express from "express";
import userAgent from "express-useragent";
import methodOverride from "method-override";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import serveFavicon from "serve-favicon";
import logger from "./helper/LogHelper";
import UtileHelper from "./helper/UtileHelper";
import { envExist } from "./helper/EnvHelper";
import { PageNotFoundException } from "./helper/ExceptionHelper";
import { passportConfig } from "./helper/PassportHelper";
import { userAgentLogMiddleware, webHelperMiddleware } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import threadRouter from "./routers/threadRouter";
import authRouter from "./routers/authRouter";
const MySQLStore = require("express-mysql-session")(session);

const app = express();

envExist();

app.use(userAgent.express());
app.use(userAgentLogMiddleware);
// 클라이언트에서 application/x-www-form-urlencoded 데이터를 보냈을때 파싱해서 body 객체에 넣어줌
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(cors());
app.use(serveFavicon(process.env.FAVICON_PATH))
app.use(methodOverride());
app.use(webHelperMiddleware);

app.use(cookieParser(process.env.COOKIE_ENCRYPT_KEY));
app.use(session({
    secret: process.env.SESSION_ENCRYPT_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
    },
    store: new MySQLStore({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        createDatabaseTable: process.env.MYSQL_SESSION_CREATE_TABLE,
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
app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // rea.session 객체에 passport 정보를 추가해서 저장
passportConfig();

app.use(express.static(join(__dirname, 'build')));
app.use("/thread/static", express.static(join(__dirname, 'build', 'static')));
app.use("/user/static", express.static(join(__dirname, 'build', 'static')));
app.use('/thread/:threadid/static', express.static(join(__dirname, 'build', 'static')));

app.use("/uploads", express.static("uploads"));
app.use("/user/uploads", express.static("uploads"));
app.use("/thread/uploads", express.static("uploads"));

app.use("/api", rootRouter);
app.use("/api/auth", authRouter);
app.use("/api/thread", threadRouter);

app.get('*', (req, res) => res.sendFile(join(__dirname, 'build', 'index.html')));

app.use((err, _, res, __) => res.sendError(err));
app.use("*", (_, res, __) => res.sendError(new PageNotFoundException()));

app.listen(process.env.PORT || "8080", () => {
    const serverIp = UtileHelper.getIp();
    logger.debug("--------------------------------------------------");
    logger.debug("|              Start Express Server              |");
    logger.debug("--------------------------------------------------");
    serverIp.forEach(ip => logger.debug(`server address => http://${ip}:${process.env.PORT}`));
    logger.debug("--------------------------------------------------");
});
process.on("exit", () => logger.debug("백엔드가 종료되었습니다."));
process.on("SIGINT", () => process.exit());