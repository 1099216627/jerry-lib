import { isNumber } from "./is";

const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7; // 7 days
/**
 * 
 * @param key 
 * @param value 
 * @param cacheTime 
 * @returns
 * @description set storage
 * @example
 * setStorage('name','zhangsan',60*60*24*7)
 */
export function setLocalStorage(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
  let time:number = isNumber(expire) ? expire as number : DEFAULT_CACHE_TIME;
  const stringData = JSON.stringify({
    value,
    expire: isNumber(expire) ? new Date().getTime() + time * 1000 : null
  });
  localStorage.setItem(key, stringData);
}
/**
 * 
 * @param key 
 * @returns 
 * @description get storage
 * @example
 * getStorage('name')
 */
export function getLocalStorage(key: string) {
  const stringData = localStorage.getItem(key);
  if (!stringData) {
    return null;
  }
  const data = JSON.parse(stringData);
  if (data.expire && data.expire < new Date().getTime()) {
    localStorage.removeItem(key);
    return null;
  }
  return data.value;
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function setSessionStorage(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
  let time:number= isNumber(expire) ? expire as number: DEFAULT_CACHE_TIME;
  const stringData = JSON.stringify({
    value,
    expire: Number(expire) ? new Date().getTime() + time * 1000 : null
  });
  sessionStorage.setItem(key, stringData);
}

export function getSessionStorage(key: string) {
  const stringData = sessionStorage.getItem(key);
  if (!stringData) {
    return null;
  }
  const data = JSON.parse(stringData);
  if (data.expire && data.expire < new Date().getTime()) {
    sessionStorage.removeItem(key);
    return null;
  }
  return data.value;
}

export function removeSessionStorage(key: string) {
  sessionStorage.removeItem(key);
}

export function clearSessionStorage() {
  sessionStorage.clear();
}