import { Block } from 'modules';

import './Link.css';

interface LinkProps {
  text: string;
  href: string;
  class: string;
  onClick: () => void;
}

export class Link extends Block {
  static componentName = 'Link';

  constructor({ onClick, ...props }: LinkProps) {
    super({
      ...props, events: { click: onClick },
    });
  }

  protected render(): string {
    return `<a class="link{{#if class}} {{class}}{{/if}}" href="{{href}}">
    {{text}}
    </a>`;
  }
}
