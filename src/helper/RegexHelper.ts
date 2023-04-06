class RegexHelper {
    private static current: RegexHelper | null = null;

    public static getInstance() {
        if (RegexHelper.current === null) {
            RegexHelper.current = new RegexHelper();
        }
        return RegexHelper.current;
    }

    /**
     * 값의 존재 여부를 검사한다.
     * @param  {string} content 검사할 값
     */
    value(content: string) {
        if (content == undefined || content == null ||
            (typeof content == 'string' && content.trim().length === 0)) {
            return false;
        }
        return true;
    }



};


export default RegexHelper.getInstance();

