class Exception extends Error {
    #code;
    #name;
    constructor(code, message) {
        super(message);
        this.#name = this.constructor.name;
        this.#code = code;
    }
    get code() {
        return this.#code;
    }
    get name() {
        return this.#name;
    }
};

export class BadRequestException extends Exception {
    constructor(msg = "잘못된 요청 입니다.") {
        super(400, msg);
    }
}

export class ForbiddenException extends Exception {
    constructor(msg = "접근 권한이 없습니다.") {
        super(403, msg);
    }
}

export class PageNotFoundException extends Exception {
    constructor(msg = "페이지를 찾을 수 없습니다.") {
        super(404, msg);
    }
}

export class RuntimeException extends Exception {
    constructor(msg = "요청을 처리하는데 실패했습니다.") {
        super(500, msg);
    }
}