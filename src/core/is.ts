/**
 * 
 * @param value 传入参数
 * @param type  数据类型
 * @returns boolean
 * @description 判断当前参数是否为指定类型
 * @example
 * is('123', 'String')
 */
export function is (value: unknown, type: string): boolean {
  return Object.prototype.toString.call(value) === `[object ${type}]`
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @returns boolean
 * @description 判断当前参数是否为字符串
 * @example
 * isString('123')
 */
export function isString (value:unknown) :boolean  {
  return is(value, 'String')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为数字
 * @example
 * isNumber(123)
 */
export function isNumber (value: unknown): boolean {
  return is(value, 'Number')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为布尔值
 * @example
 * isBoolean(true)
 */
export function isBoolean (value: unknown): boolean {
  return is(value, 'Boolean')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为函数
 * @example
 * isFunction(() => {})
 */
export function isFunction (value: unknown): boolean {
  return is(value, 'Function') || is(value, 'AsyncFunction')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为对象
 * @example
 * isObject({})
 */
export function isObject (value: unknown): boolean {
  return is(value, 'Object')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为数组
 * @example
 * isArray([])
 */
export function isArray (value: unknown): boolean {
  return is(value, 'Array')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为日期
 * @example
 * isDate(new Date())
 */
export function isDate (value: unknown): boolean {
  return is(value, 'Date')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为正则
 * @example
 * isRegExp(/123/)
 */
export function isRegExp (value: unknown): boolean {
  return is(value, 'RegExp')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为Null
 * @example
 * isNull(null)
 */
export function isNull (value: unknown): boolean {
  return is(value, 'Null')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为Undefined
 * @example
 * isUndefined(undefined)
 */
export function isUndefined (value: unknown): boolean {
  return is(value, 'Undefined')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为Symbol
 * @example
 * isSymbol(Symbol())
 */
export function isSymbol (value: unknown): boolean {
  return is(value, 'Symbol')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为Promise
 * @example
 * isPromise(Promise.resolve())
 */
export function isPromise (value: unknown): boolean {
  return is(value, 'Promise')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为中文
 * @example
 * isChinese('中文')
 */
export function isChinese (value: string): boolean {
  return /^[\u4e00-\u9fa5]+$/.test(value)
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为英文
 * @example
 * isEnglish('english')
 */
export function isEmail (value: string): boolean {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/.test(value)
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为URL
 * @example
 * isUrl('http://www.baidu.com')
 */
export function isUrl (value: string): boolean {
  return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(value)
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为手机号
 * @example
 * isPhone('12345678901')
 */
export function isPhone (value: string): boolean {
  return /^1[3456789]\d{9}$/.test(value)
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为身份证号
 * @example
 * isIdCard('123456789012345678')
 */
export function isIdCard (value: string): boolean {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为IP地址
 */
export function isIP (value: string): boolean {
  return /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(value)
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为base64
 * @example
 * isBase64('data:image/png;base64,1234567890')
 */
export function isBase64 (value: string): boolean {
  return /data:image\/\w+;base64,/.test(value)
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为Element
 * @example
 * isElement(document.createElement('div'))
 */
export function isElement (value: unknown): boolean {
  return value instanceof Element
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为空对象
 * @example
 * isEmpty({})
 */
export function isEmpty <T = any>(value: Object | T[]): boolean {
  if (value === null || value === undefined) {
    return true
  }
  if (value instanceof Array) {
    return value.length === 0
  }
  if (value instanceof Object) {
    return Object.keys(value).length === 0
  }
  return false
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否不为空对象
 * @example
 * isNotEmpty({})
 */
export function isNotEmpty (value: any): boolean {
  return !isEmpty(value)
}
/**
 * @returns boolean
 * @description 判断当前环境是否为客户端
 */
export function isClient (): boolean {
  return typeof window !== 'undefined'
}
/**
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为浏览器环境
 * @example
 * isBrowser(window)
 */
export function isBrowser (value:unknown): boolean {
  return typeof window !== 'undefined' && is(value, 'Window')
}
/**
 * 
 * @param value 传入参数
 * @returns boolean
 * @description 判断当前参数是否为void
 * @example
 * isVoid('')//
 */
export function isVoid (value: unknown): boolean {
  return value === null || value === undefined || value === ''
}