import { Router } from 'modules';
import { InputField } from 'components/InputField';
import { Form } from 'components/Form';

import template from 'bundle-text:./RegisterPage.hbs';
import './RegisterPage.css';

export class RegisterPage extends Form {
  static componentName = 'RegisterPage';

  constructor() {
    super();
    this.setProps({
      onSubmit: this.onSubmit.bind(this),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onSubmit(e: MouseEvent): void {
    const isValid = this.validateFields();

    let passwordsAreEqual = true;
    if (this.refs.passwordInputRef.value !== this.refs.passwordConfirmationInputRef.value) {
      this.refs.passwordConfirmationInputRef.setError('Пароли не совпадают');
      passwordsAreEqual = false;
    }

    if (isValid && passwordsAreEqual) {
      console.log(this.formValues);
      // Router.go('chats');
    } else {
      console.log('Invalid form values');
    }

    e.preventDefault();
  }

  render() {
    return template;
  }
}
