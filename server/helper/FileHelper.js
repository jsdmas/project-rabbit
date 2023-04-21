import { existsSync, mkdirSync, chmodSync } from "fs";
import { join } from "path";
import multer from "multer";

class FileHelper {
    static #current = null;
    static getInstance() {
        if (FileHelper.#current === null) {
            FileHelper.#current = new FileHelper();
        }
        return FileHelper.#current;
    }

    /**
     * @description 입력경로대로 폴더&파일을 생성할 수 있도록 도와줍니다.
     * @param {string} target 파일생성 경로
     * @param {string} permisson 파일권한설정 기본값 : 0755 
     */
    mkdirs(target, permision = "0755") {
        if (target == undefined || target == null) return;

        // window '\'를 '/'로 변환
        target = target.replace("\\", "/");
        const targetList = target.split("/");

        /** 폴더깊이 누적 변수 */
        let dir = "";

        // 절대경로 형식 여부
        if (target.substring(0, 1) == "/") {
            dir = "/";
        }

        // window 하드디스크 문자열(c:)일경우
        if (targetList[0].indexOf(":") > -1) {
            targetList[0] += "/";
        }

        // 배열을 순환하며 디렉토리 생성
        targetList.forEach(path => {
            dir = join(dir, path);
            if (path == ".") {
                return;
            }
            // 폴더가 없을경우 생성
            if (!existsSync(dir)) {
                mkdirSync(dir);
                chmodSync(dir, permision);
            }
        });
    }

    /**
     * @return 싱글업로드 객체
     */
    avatarMulter() {
        return multer({ dest: process.env.UPLOAD_DIR, limits: 1000 * 1000 }); // 1MB
    }

    /**
     * 에러가 존재한다면 에러 코드와 메시지를 설정하며 throw 시킨다.
     * @param {multer.MulterError} err
     */
    checkUploadError(err) {
        /** 에러 객체가 존재한다면? */
        if (err) {
            if (err instanceof multer.MulterError) {
                switch (err.code) {
                    case "LIMIT_FIELD_COUNT":
                        err.code = 500;
                        err.message = "업로드 가능한 파일 수를 초과했습니다.";
                        break;
                    case "LIMIT_FILE_SIZE":
                        err.code = 500;
                        err.message = "업로드 가능한 파일 용량을 초과했습니다.";
                        break;
                    default:
                        err.code = 500;
                        err.message = "알 수 없는 에러가 발생했습니다.";
                        break;
                }
            }
            // 에러를 발생시켜 백엔드에 전달.
            throw err;
        }
    }


}

export default FileHelper.getInstance();

