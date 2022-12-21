import { InputField } from 'components/InputField';

interface InputFieldPasswordProps {
  name?: string;
  label: string;
  value: string;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
}

export class InputFieldPassword extends InputField {
  static componentName = 'InputFieldPassword';

  passwordVisible = false;

  constructor(props: InputFieldPasswordProps) {
    super({
      validationRule: 'password',
      type: 'password',
      ...props,
    });
    this.setProps({
      actionButton: 'showpassword',
      onActionButtonClick: this.togglePasswordVisibility.bind(this),
      ...props,
    });
    this.value = props.value;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    if (this.passwordVisible) this.setType('text'); else this.setType('password');
    this.refs.iconRef.getContent().classList.toggle('active');
  }

  setType(newType: string) {
    this.refs.inputRef.getContent().setAttribute('type', newType);
  }
}
