import { Router, Block } from 'modules';
import { InputField } from 'components/InputField';

import template from 'bundle-text:./RegisterPage.hbs';
import './RegisterPage.css';

export class RegisterPage extends Block {
  static componentName = 'RegisterPage';

  constructor() {
    super();
    this.setProps({
      onSubmit: this.onSubmit.bind(this),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onSubmit(e: MouseEvent): void {
    const loginInputField = this.refs.loginInputRef as InputField;
    const passwordInputField = this.refs.passwordInputRef as InputField;

    let isValid = true;
    [loginInputField, passwordInputField].forEach((field) => { isValid = field.validate() && isValid; });

    if (isValid) {
      const formValues = {
        loginValue: loginInputField.value,
        passwordValue: passwordInputField.value,
      };
      console.log(formValues);
      Router.go('chats');
    } else {
      console.log('Invalid form values');
    }

    e.preventDefault();
  }

  render() {
    return template;
  }
}
