import { Block } from 'modules';
import template from 'bundle-text:./Button.hbs';

import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

export class Button extends Block {
  static componentName = 'Button';

  constructor({
    onClick, onMouseDown, onMouseUp, ...props
  }: ButtonProps) {
    super({ ...props, events: { click: onClick, mousedown: onMouseDown, mouseup: onMouseUp } });
  }

  protected render(): string {
    return template;
  }
}
