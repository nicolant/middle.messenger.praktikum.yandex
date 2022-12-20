import Block from 'modules/Block';

import './InputField.css';

interface InputFieldProps {
  name?: string;
  label: string;
  value?: string;
  error?: string;
  onInput?: () => void;
  onFocus?: () => void;
}

export class InputField extends Block {
  static componentName = 'InputField';

  constructor(props: InputFieldProps) {
    super({
      ...props,
      onBlur: (e: FocusEvent): void => {
        const inputEl = e.target as HTMLInputElement;
        if (inputEl.value.length && inputEl.value.length < 4) this.refs.errorRef.setProps({ text: 'недостаточно символов' });
      },
      onInput: (e: InputEvent): void => {
        this.refs.errorRef.setProps({ text: '' });
      },
    });
  }

  protected render(): string {
    return `
    <div class="inputfield">
      {{{ErrorMessage ref="errorRef" message=error}}}
      {{{Input ref="inputRef" name=name type=type value=value onInput=onInput onFocus=onFocus onBlur=onBlur onInput=onInput}}}
      <label class="inputfield__label" for="{{name}}">{{label}}</label>
    </div>
    `;
  }
}
