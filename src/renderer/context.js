// 创建画布上下文
import { createSVGElement, mount } from './utils';

export function createContext(width, height) {
  // 创建画布 SVG 节点， 并设置宽高
  const svg = createSVGElement('svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // 创建 g 节点， 并挂载到svg
  const g = createSVGElement('g');
  mount(svg, g);

  // 返回画布节点和挂载节点
  return {
    node: svg,
    group: g,
  };
}
