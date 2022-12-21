import Block from 'modules/Block';

import template from 'bundle-text:./LoginPage.hbs';
import './LoginPage.css';

export class LoginPage extends Block {
  static componentName = 'LoginPage';

  constructor() {
    super();
    this.setProps({
      loginValue: '',
      passwordValue: '',
      showPassword: this.showPassword.bind(this),
      hidePassword: this.hidePassword.bind(this),
      onSubmit: this.onSubmit.bind(this),
    });
  }

  showPassword(e: MouseEvent) {
    console.log('show password');
    this.refs.passwordInputRef.setType('text');
  }

  hidePassword(e: MouseEvent) {
    console.log('hide password');
    this.refs.passwordInputRef.setType('password');
  }

  // eslint-disable-next-line class-methods-use-this
  onSubmit(e: MouseEvent): void {
    console.log('submit');
    // const loginInputField = this.refs.loginInputRef;
    // const passwordInputField = this.refs.passwordInputRef;

    /* this.setProps({
      loginValue: loginInputField.props.value,
      passwordValue: passwordInputField.props.value,
    }); */

    e.preventDefault();
  }

  render() {
    return template;
  }
}
