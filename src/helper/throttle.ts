export const throttle = (func: Function, limit: number | undefined) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    // 사이드 이펙트 방지
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
