import { BadRequestException } from "./ExceptionHelper";

class RegexHelper {
    static #current = null;

    static getInstance() {
        if (RegexHelper.#current === null) {
            RegexHelper.#current = new RegexHelper();
        }

        return RegexHelper.#current;
    }

    /**
     * 값의 존재 여부를 검사한다.
     * @param  {string} content 검사할 값
     * @param  {string} msg     값이 없을 경우 표시할 메시지 내용
     */
    value(content, msg) {
        if (content == undefined || content == null ||
            (typeof content == 'string' && content.trim().length === 0)) {
            throw new BadRequestException(msg);
        }

        return true;
    }

    /**
     * 입력값이 지정된 글자수를 초과했는지 검사한다.
     * @param  {string} content    검사할 값
     * @param  {int} len           최대 글자수
     * @param  {string} msg        값이 없을 경우 표시될 메시지
     */
    maxLength(content, len, msg) {
        if (!this.value(content) || content.length > len) {
            throw new BadRequestException(msg);
        }

        return true;
    }

    /**
     * 입력값이 지정된 글자수 미만인지 검사한다.
     * @param  {string} content  검사할 값
     * @param  {int} len         최소 글자수
     * @param  {string} msg      값이 없을 경우 표시될 메시지
     */
    minLength(content, len, msg) {
        if (!this.value(content) || content.length < len) {
            throw new BadRequestException(msg);
        }

        return true;
    }

    /**
     * 이메일주소 형식인지 검사하기 위해 field()를 간접적으로 호출한다.
     * @param  {string} content   입력내용
     */
    email(content, msg) {
        const regexExpr = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        const src = typeof content == 'string' ? content.trim() : content;
        if (!src || !regexExpr.test(src)) {
            throw new BadRequestException(msg);
        }
        return true;
    }

}

export default RegexHelper.getInstance();