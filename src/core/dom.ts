type ViewportOffsetResult = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  rightIncludeBody: number;
  bottomIncludeBody: number;
}
/**
 * 
 * @param element 传入参数
 * @returns DOMRect | number
 * @description 获取元素的大小及其相对于视口的位置
 * @example
 * getBoundingClientRect(document.querySelector('div'))
 */
export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0;
  }
  return element.getBoundingClientRect();
}
/**
 * 
 * @param el 传入节点参数
 * @param className 传入类名参数
 * @returns boolean
 * @description 判断当前节点是否包含某个类名
 * @example
 * hasClass(document.querySelector('div'), 'class')
 */
export function hasClass(el: Element, className: string): boolean {
  if (!el || !className) {
    return false;
  }
  if (className.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.');
  }
  if (el.classList) {
    return el.classList.contains(className);
  }
  return (` ${el.className} `).indexOf(` ${className} `) > -1;
}
/**
 * 
 * @param element 传入节点参数
 * @returns ViewportOffsetResult
 * @description 获取元素的大小及其相对于视口的位置
 * @example
 * getViewportOffset(document.querySelector('div'))
 */
export function getViewportOffset(element: Element): ViewportOffsetResult {
  const doc = document.documentElement;
  const docScrollLeft = doc.scrollLeft;
  const docScrollTop = doc.scrollTop;
  const docClientLeft = doc.clientLeft;
  const docClientTop = doc.clientTop;
  const pageXOffset = window.pageXOffset;
  const pageYOffset = window.pageYOffset;
  const box = getBoundingClientRect(element);
  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect;
  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
  const offsetLeft = retLeft + pageXOffset;
  const offsetTop = rectTop + pageYOffset;
  const left = offsetLeft - scrollLeft;
  const top = offsetTop - scrollTop;
  const clientWidth = window.document.documentElement.clientWidth;
  const clientHeight = window.document.documentElement.clientHeight;
  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top,
  };
}
/**
 * 
 * @param element 传入节点参数
 * @returns Element[]
 * @description 获取元素的子元素
 * @example
 * getElementChildren(document.querySelector('div'))
 */
export function getElementChildren(element: Element): Element[] {
  const ELEMENT_TYPE = 1;
  const children = element.children;
  const result: Element[] = [];
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeType === ELEMENT_TYPE) {
      //仅返回元素节点
      result.push(children[i]);
    }
  }
  return result;
}
/**
 * 
 * @param element 传入节点参数
 * @param prop 传入属性参数
 * @returns CSSStyleDeclaration | string
 * @description 获取元素的样式
 * @example
 * getElementStyles(document.querySelector('div'), 'width')
 */
export function getElementStyles(element: Element, prop?: string): CSSStyleDeclaration | string {
  if (prop) {
    return window.getComputedStyle(element, null)[prop as any]
  } else {
    return window.getComputedStyle(element, null)
  }
}
//撤销
export function undo() {
  document.execCommand('undo');
}
//重做
export function redo() {
  document.execCommand('redo');
}
// 获取选中区域的文本
export function getSelectionText() {
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    const text = range.toString();
    return text;
  }
  return '';
}
// 获取选中区域的html
export function getSelectionHtml() {
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    const container = document.createElement('div');
    container.appendChild(range.cloneContents());
    const html = container.innerHTML;
    return html;
  }
  return '';
}
// 获取选中区域
export function getSelectionRange() {
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    return range;
  }
  return null;
}
// 获取选中区域的容器
export function getSelectionContainer() {
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    return container;
  }
  return null;
}
/**
 * @returns { left: number; top: number; width: number; height: number } | null
 * @description 获取选中区域的位置以及宽高
 */
export function getSelectionPosition(): { left: number; top: number; width: number; height: number } | null {
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    const { left, top,width,height } = range.getBoundingClientRect();
    return { left, top,width,height };
  }
  return null;
}
/**
 * @description 拷贝文本到剪切板
 */
export function copySelectionText() {
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    const text = range.toString();
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
}
// 获取滚动条距离顶部的距离
export function getScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop;
}
// 获取滚动条距离左边的距离
export function getScrollLeft() {
  return document.documentElement.scrollLeft || document.body.scrollLeft;
}
// 获取元素距离顶部的距离
export function getElementTop(element:HTMLElement) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent as HTMLElement;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent as HTMLElement;
  }
  return actualTop;
}
// 获取元素距离左边的距离
export function getElementLeft(element:HTMLElement) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent as HTMLElement;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent as HTMLElement;
  }
  return actualLeft;
}
// 获取元素的宽度
export function getElementWidth(element:HTMLElement) {
  return element.offsetWidth;
}
// 获取元素的高度
export function getElementHeight(element:HTMLElement) {
  return element.offsetHeight;
}
// 获取元素的宽度和高度
export function getElementSize(element:HTMLElement) {
  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}