import { applyAttributes, createSVGElement, mount } from './utils';

export function shape(type, context, attributes) {
  const { group } = context; // 挂载元素，新创建的图形元素会被挂载到该元素下
  const el = createSVGElement(type); // 创建图形元素
  applyAttributes(el, attributes); // 设置属性

  mount(group, el); // 挂载
  return el;
}

// 线
export function line(context, attributes) {
  return shape('line', context, attributes);
}

// 矩形
export function rect(context, attributes) {
  const {
    width, height, x, y,
  } = attributes;

  return shape('rect', context, {
    ...attributes,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : width + x,
    y: height > 0 ? y : height + y,
  });
}

// 圆
export function circle(context, attributes) {
  return shape('circle', context, attributes);
}

// 环
export function ring(context, attributes) {
  // r1: 内圆半径; r2: 外圆半径;
  const {
    cx, cy, r1, r2, ...styles
  } = attributes;
  const { stroke, strokeWidth, fill } = styles;
  const defaultStrokeWidth = 1;
  const innerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r1,
  });
  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    fill: 'transparent',
    cx,
    cy,
    r: (r1 + r2) / 2,
  });
  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r2,
  });
  return [innerStroke, ring, outerStroke];
}

// 文字
export function text(context, attributes) {
  const { text, ...rest } = attributes;
  const textEl = shape('text', context, rest);
  textEl.textContent = text;
  return textEl;
}

// 路径
export function path(context, attributes) {
  const { d } = attributes;
  return shape('path', context, { ...attributes, d: d.flat().join(' ') });
}
