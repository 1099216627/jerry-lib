import { isObject } from "./is";

/**
 * 
 * @param html 传入html字符串
 * @returns string
 * @description 转义html字符串(防止XSS攻击)
 * @example
 * escapeHTML('<div>123</div>')
 */
export function escapeHTML(html: string): string {
  return html.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, "'");
}
/**
 * 
 * @param fn 传入函数
 * @param delay 传入延迟时间
 * @returns Function
 * @description 函数节流
 * @example
 * const fn = throttle(fn, 1000)
 */
export function throttle(fn: Function, delay: number) {
  let timer: any = null;
  return function (this:any, ...args: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
/**
 *  
 * @param fn 传入函数
 * @param delay 传入延迟时间
 * @returns Function
 * @description 函数防抖
 * @example
 * const fn = debounce(fn, 1000)
 * */
export function debounce(fn: Function, delay: number) {
  let timer: any = null;
  return function (this:any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
/**
 * 
 * @param data 传入数据
 * @param id 
 * @param pid 
 * @param children 
 * @returns Array
 * @description 关系型数组转树形结构
 * @example
 * flatToTree(data)
 */
export function flatToTree(data: any, id = 'id', pid = 'pid', children = 'children'){
  const result: any = [];
  const hash: any = {};
  data.forEach((item: any, index: number) => {
    hash[data[index][id]] = data[index];
  });
  data.forEach((item: any) => {
    const hashVP = hash[item[pid]];
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}
/**
 * 
 * @param arr 传入数组
 * @returns Array
 * @description 数组扁平化
 * @example
 * flatten([1, [2, [3, 4]]])
 */
export function flatten<T>(arr: T[]):T[] {
  return arr.reduce((prev: any, next: any) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}
/**
 * 
 * @param data 传入数据
 * @param children children字段
 * @returns Array
 * @description 树形结构转关系型数组
 * @example
 * flattenTree(data)
 */
export function flattenTree(data: any, children = 'children') {
  let result: any = [];
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    result.push(node);
    if (node[children]) {
      result = result.concat(flattenTree(node[children], children));
      delete node[children];
    }
  }
  return result;
}
/**
 * 
 * @param objs 传入对象
 * @returns Object
 * @description 深度合并对象
 * @example
 * deepMerge({a: 1}, {b: 2})
 */
export function deepMerge(...objs: any[]) {
  const result: any = {};
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (isObject(val)) {
          if (isObject(result[key])) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });
  return result;
}
/**
 * 
 * @param obj 传入对象
 * @returns Object
 * @description 深度克隆对象
 * @example
 * deepClone({a: 1})
 */
export function deepClone<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let result: any;
  if (obj instanceof Array) {
    result = [];
  } else {
    result = {};
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}
