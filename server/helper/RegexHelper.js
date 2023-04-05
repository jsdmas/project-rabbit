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

}

export default RegexHelper.getInstance();