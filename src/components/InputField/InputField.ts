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
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
}

export class InputField extends Block {
  static componentName = 'InputField';

  constructor(props: InputFieldProps) {
    super();
    this.setProps({
      ...props,
      events: {
        input: (): void => {
          this.refs.errorRef.setProps({ text: '' });
        },
        change: (): void => {
          console.log('change');
          const { value } = this.refs.inputRef.getContent() as HTMLInputElement;
          this.setProps({ value });
          const { validationRule } = props;
          const text = validateValue(value, validationRule);
          if (text) {
            this.refs.errorRef.setProps({ text });
          }
        },
      },
    });
  }

  setType(newType: string) {
    console.log('setType');
    const { value } = this.refs.inputRef.getContent() as HTMLInputElement;
    this.setProps({ value });
    this.refs.inputRef.setProps({ type: newType });
  }

  protected render(): string {
    return `
    <div class="inputfield">
      {{{ErrorMessage ref="errorRef" message=error}}}
      {{{Input ref="inputRef" name=name type=type value=value}}}
      <label class="inputfield__label" for="{{name}}">{{label}}</label>
    </div>
    `;
  }
}
