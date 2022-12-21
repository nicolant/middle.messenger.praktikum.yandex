import Block from 'modules/Block';

import './InputField.css';
import validateValue from 'helpers/validateValue';

interface InputFieldProps {
  name?: string;
  label: string;
  value: string;
  error?: string;
  validationRule?: string;
  type?: string;
  onInput?: EventListenerOrEventListenerObject;
  onFocus?: EventListenerOrEventListenerObject;
  onBlur?: EventListenerOrEventListenerObject;
  onChange?: EventListenerOrEventListenerObject;
}

export class InputField extends Block {
  static componentName = 'InputField';

  value?: string = '';

  constructor(props: InputFieldProps) {
    super();
    this.setProps({
      ...props,
      events: {
        input: (e: InputEvent): void => {
          this.value = e.target.value;
          this.refs.errorRef.setProps({ text: '' });
        },
        change: (): void => {
          this.validate();
        },
      },
    });
  }

  validate(): boolean {
    console.log('validate');
    const { value } = this.refs.inputRef.getContent() as HTMLInputElement;
    const { validationRule } = this.props as InputFieldProps;
    const text = validateValue(value, validationRule);
    if (text) {
      this.refs.errorRef.setProps({ text });
      return false;
    }
    return true;
  }

  protected render(): string {
    return `
    <div class="inputfield inputfield-{{name}}">
      {{{ErrorMessage ref="errorRef" message=error}}}
      {{{Input ref="inputRef" name=name type=type value=value}}}
      <label class="inputfield__label" for="{{name}}">{{label}}</label>
      {{#if actionButton}}{{{ Button ref="iconRef" class="icon-action" onClick=onActionButtonClick }}}{{/if}}
    </div>
    `;
  }
}
