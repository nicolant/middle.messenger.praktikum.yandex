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
    let isValid = true;
    Object.values(this.refs).forEach((field) => { if (field instanceof InputField) isValid = field.validate() && isValid; });

    let passwordsAreEqual = true;
    if (this.refs.passwordInputRef.value !== this.refs.passwordConfirmationInputRef.value) {
      this.refs.passwordConfirmationInputRef.setError('Пароли не совпадают');
      passwordsAreEqual = false;
    }

    if (isValid && passwordsAreEqual) {
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
