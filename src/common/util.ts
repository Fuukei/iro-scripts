/**
 * 传入的函数同时间只能运行一个
 * @param func 要包装的函数
 * @returns 包装后的函数
 */
export const onlyOnceATime = <T extends Function>(func: T) => {
    let isRunning = false
    return (...args: any) => {
        if (!isRunning) {
            isRunning = true
            try {
                const result = func(...args)
                if (result instanceof Promise) {
                    result.finally(() => isRunning = false)
                } else {
                    isRunning = false
                }
                return result
            } catch (e) {
                console.warn(e)
                isRunning = false
            }
        }
    }
}
/**
 * 延迟函数到DOM树加载完成后执行
 * @seealso https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState
 * @param fn 要延迟执行的函数
 */
export const ready = function (fn:Function) {
    //interactive:等价于事件DOMContentLoaded
    //complete:等价于事件load
    if (document.readyState !== 'loading') {
        return fn();
    }
    //@ts-ignore
    document.addEventListener('DOMContentLoaded', fn, false);
};
export function slideToggle(el: any, duration = 1000, mode = '', callback?: () => void) {
    let dom = el;
    dom.status = dom.status || getComputedStyle(dom, null)['display'];
    const flag = dom.status != 'none';
    if ((flag == true && mode == "show") || (flag == false && mode == "hide")) return;
    dom.status = flag ? 'none' : 'block';
    dom.style.transition = 'height ' + duration / 1000 + 's';
    dom.style.overflow = 'hidden';
    clearTimeout(dom.tagTimer);
    dom.tagTimer = dom.tagTimer || null;
    dom.style.display = 'block';
    dom.tagHeight = dom.tagHeight || dom.clientHeight + 'px';
    dom.style.display = '';
    dom.style.height = flag ? dom.tagHeight : "0px";
    setTimeout(() => {
        dom.style.height = flag ? "0px" : dom.tagHeight
    }, 0);
    dom.tagTimer = setTimeout(() => {
        dom.style.display = flag ? 'none' : 'block';
        dom.style.transition = '';
        dom.style.overflow = '';
        dom.style.height = '';
        dom.status = dom.tagHeight = null;
    }, duration);
    if (callback) callback();
}
export const max = (a: number, b: number) => a > b ? a : b
export const min = (a: number, b: number) => a < b ? a : b