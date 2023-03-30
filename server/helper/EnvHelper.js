import { existsSync } from "fs";
import { join, resolve } from "path";
import { config } from "dotenv";

/**
 * @description 환경설정 파일 여부를 검사합니다.
 * @returns dotenv config
 */
export const envExist = () => {
    const FileName = process.env.NODE_ENV !== "production" ? ".env.dev" : ".env.production";
    const path = join(resolve(), FileName);

    if (!existsSync(path)) {
        try {
            throw new Error();
        } catch (error) {
            console.error(`환경설정 파일을 찾을 수 없습니다. 환경설정 파일 경로를 확인하세요.`);
            console.error(`환경설정 파일 경로 : ${path}`);
            console.error(`프로그램 종료`);
            process.exit(1);
        }
    }
    return config({ path });
};
