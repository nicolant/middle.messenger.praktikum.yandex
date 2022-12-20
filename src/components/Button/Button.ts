import { Block } from 'modules';
import template from 'bundle-text:./Button.hbs';

import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export class Button extends Block {
  static componentName = 'Button';

  constructor({ text, onClick }: ButtonProps) {
    super({ text, events: { click: onClick } });
  }

  protected render(): string {
    return template;
  }
}
