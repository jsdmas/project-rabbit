import { ForbiddenException } from "./helper/ExceptionHelper";
import logger from "./helper/LogHelper";
import UtileHelper from "./helper/UtileHelper";

/**
 * @description user접속 기록을 log로 저장합니다.
 */
export const userAgentLogMiddleware = (req, res, next) => {
    logger.debug("client 접속");
    const beginTime = Date.now();
    const currentUrl = UtileHelper.urlFormat({
        protocol: req.protocol,
        host: req.get("host"),
        port: req.port,
        pathname: req.originalUrl
    });
    // decodeURIComponent : 이스케이핑 된 문자열을 정상적인 문자열로 되돌려준다.
    logger.debug(`[${req.method}] ${decodeURIComponent(currentUrl)}`);
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    logger.debug(`[client] ${ip} / ${req.useragent.os} / ${req.useragent.browser} (${req.useragent.version}) / ${req.useragent.platform}`);
    res.on("finish", () => {
        const endTime = Date.now();
        const time = endTime - beginTime;
        logger.debug(`클라이언트의 접속이 종료되었습니다. ::: [runtime] ${time}ms`);
        logger.debug("--------------------------------------------------");
    });
    next();
};

/**
 * @description data & error 전송을 담당하는 확장함수
 */
export const webHelperMiddleware = (req, res, next) => {

    res._sendResult = (data, error = null) => {
        console.group("req.session");
        console.log(req.session);
        console.groupEnd();
        const json = {
            rt: "OK",
            rtcode: 200,
            rtmsg: "SUCCESS",
            isLogging: req.isAuthenticated(),
        };

        if (error) {
            json.rtcode = error?.code || 500;
            json.rt = error?.name || "Server Error";
            json.rtmsg = error?.message || "요청을 처리하는데 실패했습니다.";
        }

        if (data) {
            for (const item in data) {
                json[item] = data[item];
            }
        }

        // 표준시로부터 한국의 시차를 적용하여 ISO 포멧을 생성
        const offset = new Date().getTimezoneOffset() * 60 * 1000;
        const today = new Date(Date.now() - offset);
        json.pubdate = today.toISOString();

        res.header("Content-Type", "application/json; charset=utf-8");
        res.status(json.rtcode || 200).send(json);
    };

    /** 결과 값을 전송합니다. */
    res.sendResult = (data) => {
        res._sendResult(data);
    };

    /** 결과 값을 에러로 전송합니다. */
    res.sendError = (error) => {
        logger.error(error.stack);
        res._sendResult(null, error);
    };

    next();
};

export const isLoggedIn = (req, _, next) => {
    // isAuthenticated는 passport 가 만들어준 메서드입니다.
    console.log("req.isAuthenticated()" + req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        throw new ForbiddenException();
    }
};

export const isNotLoggedIn = (req, res, next) => {
    console.log("req.isAuthenticated()" + req.isAuthenticated());
    if (!req.isAuthenticated()) {
        next();
    } else {
        throw new ForbiddenException();
    }
};

