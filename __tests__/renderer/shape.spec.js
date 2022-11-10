import { createRenderer } from '../../src/renderer';
import { shape } from '../../src/renderer/shape';
import { createDiv, getAttributes, mount } from '../utils';

describe('shape', () => {
  test('shape(name,context,attributes) creates SVG element width specified attributes and mounts to group', () => {
    const renderer = createRenderer(600, 500);
    const context = { group: renderer.group() };

    const s = shape('circle', context, {
      cx: 150,
      cy: 150,
      r: 75,
      fill: '#f08080',
      stroke: '#778899',
      strokeWidth: 10,
    });

    mount(createDiv(), renderer.node());

    expect(s.tagName).toBe('circle');
    expect(s.parentNode).toBe(renderer.group());
    expect(
      getAttributes(s, ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width']),
    ).toEqual({
      cx: '150',
      cy: '150',
      r: '75',
      fill: '#f08080',
      stroke: '#778899',
      'stroke-width': '10',
    });
  });
});
