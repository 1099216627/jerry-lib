/**
 * 
 * @param date 传入日期参数
 * @param fmt 传入格式化参数 
 * @returns string
 * @description 格式化日期
 * @example
 * formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
 */
export type DateFmtType = 'yyyy-MM-dd hh:mm:ss' | 'yyyy-MM-dd' | 'hh:mm:ss' | 'yyyy-MM-dd hh:mm' | 'yyyy-MM-dd hh' | 'yyyy-MM' | 'yyyy' | 'MM-dd' | 'hh:mm' | 'hh'
interface KeyType<T = any> {
  [key: string]: T
}
export function formatDate(date:Date, fmt:DateFmtType):string {
  let newFmt:any = fmt || 'yyyy-MM-dd hh:mm:ss';
  if (/(y+)/.test(newFmt)) {
    newFmt = newFmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o: KeyType = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      newFmt = newFmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return newFmt;
}
function padLeftZero(str:string) {
  return ('00' + str).substring(str.length);
}
/**
 * 
 * @param money 传入金额
 * @param n 传入保留小数位数
 * @returns string
 * @description 格式化金额
 * @example
 * formatMoney(123456789, 3)
 */
export function formatMoney(money: number, n: number = 2): string {
  let num = money.toFixed(n);
  let re = /(-?\d+)(\d{3})/;
  while (re.test(num)) {
    num = num.replace(re, "$1,$2");
  }
  return num;
}
/**
 * 
 * @param text 传入文本
 * @param len 传入长度
 * @returns string
 * @description 截取文本位数后加省略号
 * @example
 * subText('123456789', 3)
 */
export function subText(text: string, len: number): string {
  if (text.length > len) {
    return text.substring(0, len) + '...'
  } else {
    return text
  }
}