import Block from 'modules/Block';

interface InputProps {
  name?: string;
  class?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
}

export class Input extends Block {
  static componentName = 'Input';

  value?: string = '';

  constructor({
    onFocus, onBlur, onChange, ...props
  }: InputProps) {
    super({
      ...props,
      events: {
        input: (e: InputEvent): void => {
          this.value = e.target.value;
        },
        focus: onFocus,
        blur: onBlur,
        change: onChange,
      },

    });
    this.value = props.value;
  }

  protected render(): string {
    return `
      <input 
      name={{name}} 
      class="inputfield__input{{#if class}} {{class}}{{/if}}" 
      placeholder={{name}} 
      type="{{#if type}}{{type}}{{else}}text{{/if}}"
      {{#if disabled}} disabled{{/if}}
      value={{value}}>
      </input>`;
  }
}
