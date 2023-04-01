import { networkInterfaces } from "os";

class UtilHerlper {
    static #current = null;
    static getInstunce() {
        if (UtilHerlper.#current === null) {
            UtilHerlper.#current = new UtilHerlper();
        }
        return UtilHerlper.#current;
    }

    getIp() {
        const ipAddress = [];
        const nets = networkInterfaces(); // 시스템정보
        for (const attribute in nets) {
            const item = nets[attribute];
            item.forEach(value => {
                // window : IPv4, linux,mac : 4 로 표시된다.
                if ((value.family == "IPv4" || value.family == 4) && value.address != "127.0.0.1") {
                    // IPv6 제외 (http://fe80::607f:7dff:fe21:efc:8000 매우 많이 나타남.)
                    // localhost (127.0.0.1) 자기 자신 제외
                    ipAddress.push(value.address);
                }
            });
        }
        return ipAddress;
    }

    /**
     * 입력한 url 객체를 반환하여 문자열로 표현합니다.
     * new URL로 지정한 가상의 주소는 url객체를 만들기위해 사용했습니다.
     * @returns {String} urlObject
     */
    urlFormat(urlObject) {
        return String(Object.assign(new URL("http://a.com"), urlObject));
    }

}

export default UtilHerlper.getInstunce();