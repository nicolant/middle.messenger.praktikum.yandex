import Block from 'modules/Block';

interface InputProps {
  name?: string;
  class?: string;
  type?: 'text' | 'password' | 'email';
  value?: string;
  disabled?: boolean;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class Input extends Block {
  static componentName = 'Input';

  constructor({
    onInput, onFocus, onBlur, ...props
  }: InputProps) {
    super({ ...props, events: { input: onInput, focus: onFocus, blur: onBlur } });
  }

  protected render(): string {
    return `
      <input 
      name="{{name}}" 
      class="inputfield__input{{#if class}} {{class}}{{/if}}" 
      placeholder="{{name}}" 
      type="{{#if type}}{{type}}{{else}}text{{/if}}"
      value="{{value}}"
      {{#if disabled}} disabled{{/if}}>
      </input>`;
  }
}
