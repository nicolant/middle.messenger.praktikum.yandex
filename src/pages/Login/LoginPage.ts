import { Router, Block } from 'modules';
import { InputField } from 'components/InputField';

import template from 'bundle-text:./LoginPage.hbs';
import './LoginPage.css';

export class LoginPage extends Block {
  static componentName = 'LoginPage';

  constructor() {
    super();
    this.props.onSubmit = this.onSubmit.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  onSubmit(e: MouseEvent): void {
    const loginInputField = this.refs.loginInputRef as InputField;
    const passwordInputField = this.refs.passwordInputRef as InputField;

    let isValid = true;
    Object.values(this.refs).forEach((field) => { if (field instanceof InputField) isValid = field.validate() && isValid; });

    if (isValid) {
      const formValues = {
        loginValue: loginInputField.value,
        passwordValue: passwordInputField.value,
      };
      console.log(formValues);
      Router.go('/chats');
    }

    e.preventDefault();
  }

  render() {
    return template;
  }
}
