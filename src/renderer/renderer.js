import { createContext } from './context';
import {
  line, rect, circle, path, text, ring,
} from './shape';
import {
  translate, scale, rotate, save, restore,
} from './transform';

export function createRenderer(width, height) {
  const context = createContext(width, height);

  return {
    line: (attributes) => line(context, attributes),
    circle: (attributes) => circle(context, attributes),
    rect: (attributes) => rect(context, attributes),
    text: (attributes) => text(context, attributes),
    path: (attributes) => path(context, attributes),
    ring: (attributes) => ring(context, attributes),

    translate: (...arg) => translate(context, ...arg),
    scale: (...arg) => scale(context, ...arg),
    rotate: (...arg) => rotate(context, ...arg),
    save: () => save(context),
    restore: () => restore(context),

    node: () => context.node,
    group: () => context.group,
  };
}
