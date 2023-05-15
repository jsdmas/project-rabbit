
export const throttle = (func: Function, limit: number | undefined) => {
    let inThrottle: boolean;
    return function (this: any, ...args: any[]) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit)
        }
    }
};
