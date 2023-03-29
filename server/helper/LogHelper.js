import { format, createLogger, transports } from "winston";
import winstonDaily from "winston-daily-rotate-file";
import fileHelper from "./FileHelper";
import { envExist } from "./EnvHelper";

envExist();
fileHelper.mkdirs(process.env.LOG_PATH);

const { combine, timestamp, printf, splat, colorize } = format;

const logger = createLogger({
    // 로그형식 정의
    format: combine(
        timestamp({ format: "YY/MM/DD HH:mm:ss SSS" }),
        printf(({ timestamp, level, message }) => `${timestamp} : [${level}] : ${message}`),
        splat()
    ),
    // 일반 로그 규칙 정의
    transports: [
        // 하루에 하나씩 생성
        new winstonDaily({
            name: "log",
            level: process.env.LOG_LEVEL, //로그 level
            datePattern: "YYMMDD", // 파일 이름에 표시될 날짜 형식
            dirname: process.env.LOG_PATH, // 파일이 저장될 위치
            filename: "log_%DATE%.log", // 파일이름 형식
            maxSize: 5000_0000, // byte (50Mb)
            maxFiles: 50,
            zippedArchive: true, //압축여부
        })
    ]
});

// 개발 버전일시 콘솔에 로그 출력
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new transports.Console({
            prettyPrint: true,
            showLevel: true,
            level: process.env.LOG_LEVEL,
            format: combine(
                colorize({ all: true }),
                printf(({ timestamp, level, message }) => `${timestamp} : [${level}] : ${message}`)
            ),
        })
    );
};

export default logger;