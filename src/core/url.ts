import {isVoid} from './is'
/**
 * 
 * @param baseUrl 基础url
 * @param obj 参数对象
 * @returns string
 * @description 将对象转换为url参数
 * @example
 * setObjToQuery('http://www.baidu.com', {a: 1, b: 2})
 */
export function setObjToQuery(baseUrl: string, obj:Record<string,any>): string {
  let parameters = "";
  let url = "";
  for (const key in obj) {
    parameters += key + "=" + encodeURIComponent(obj[key]) + "&";
  }
  parameters = parameters.replace(/&$/, "");
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, "?") + parameters;
  }
  return url;
}
/**
 * 
 * @param obj 参数对象
 * @returns  object
 * @description 将对象中的空值删除
 * @example
 * removeEmptyValue({a: 1, b: 2, c: null})
 */
export function removeEmptyValue(obj: Record<string,any>): object {
  const newObj:any = {};
  for (const key in obj) {
    if (!isVoid(obj[key])) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
/**
 * 
 * @param variable 参数
 * @returns string | null
 * @description 获取url参数
 * @example
 * getQueryVariable('a')
 */
export function getQueryVariable(variable: string): string | null {
  const location = window.location;
  const hash = location.hash;
  if (hash) {
    const match = hash.match(new RegExp(variable + "=([^&]*)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
  }else{
    const query = location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return null;
  }
}
/**
 * @returns Record<string,any>
 * @description 获取url参数对象
 */
export function getQueryObject(): Record<string,any> {
  const location = window.location;
  const hash = location.hash;
  if (hash) {
    const search = hash.split("?")[1];
    if (!search) {
      return {};
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  }else{
    const search = location.search.substring(1);
    if (!search) {
      return {};
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  }
}