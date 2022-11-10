// 创建 SVG 元素
export function createSVGElement(type) {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
}

// 将子元素挂载到父节点
export function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}

// 设置元素属性
export function applyAttributes(element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    // 驼峰属性需转换为 "-" 连接的属性。例：strokeWidth >> stroke-width
    // 思路：大写字母替换为 "-" + 小写字母
    const kebabCaseKey = key.replace(
      /[A-Z]/g,
      (d) => `-${d.toLocaleLowerCase()}`,
    );
    element.setAttribute(kebabCaseKey, value);
  }
}

// 设置元素变换
export function applyTransform(element, transform) {
  const oldTransform = element.getAttribute('transform') || '';
  const prefix = oldTransform ? `${oldTransform} ` : '';
  element.setAttribute('transform', `${prefix}${transform}`);
}
