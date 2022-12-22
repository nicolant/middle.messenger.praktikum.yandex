import Block from 'modules/Block';

import './InputField.css';
import validateValue from 'helpers/validateValue';

interface InputFieldProps {
  name?: string;
  label: string;
  value: string;
  error?: string;
  validation?: string;
  type?: string;
  onInput?: EventListenerOrEventListenerObject;
  onFocus?: EventListenerOrEventListenerObject;
  onBlur?: EventListenerOrEventListenerObject;
  onChange?: EventListenerOrEventListenerObject;
}

export class InputField extends Block {
  static componentName = 'InputField';

  value = '';

  constructor(props: InputFieldProps) {
    super();
    this.setProps({
      ...props,
      events: {
        input: (e: Event): void => {
          this.value = (e.target as HTMLInputElement).value;
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
    let { validation } = this.props as InputFieldProps;
    if (!validation) validation = this.props.name;
    const text = validateValue(value, validation);
    if (text) {
      this.setError(text);
      return false;
    }
    return true;
  }

  setError(text: string) {
    this.refs.errorRef.setProps({ text });
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
