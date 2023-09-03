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
    if (
      content == undefined ||
      content == null ||
      (typeof content == 'string' && content.trim().length === 0)
    ) {
      return false;
    }

    return true;
  }

  /**
   * 두 값이 동일한지 검사한다.
   * @param  {string} origin  원본
   * @param  {string} compare 검사 대상
   */
  compareTo(origin: string, compare: string) {
    const src = origin.trim();
    const dsc = compare.trim();

    return src === dsc ? true : false;
  }

  /**
   * 이메일주소 형식인지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param  {string} content   입력내용
   */
  email(content: string) {
    const regexExpr =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const src = typeof content == 'string' ? content.trim() : content;

    if (!src || !regexExpr.test(src)) {
      return false;
    }

    return true;
  }
}

export default RegexHelper.getInstance();
