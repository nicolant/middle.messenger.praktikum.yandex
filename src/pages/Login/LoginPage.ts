import { Router } from 'modules';
import { Form } from 'components/Form';

import template from 'bundle-text:./LoginPage.hbs';
import './LoginPage.css';

export class LoginPage extends Form {
  static componentName = 'LoginPage';

  constructor() {
    super();
    this.props.onSubmit = this.onSubmit.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  onSubmit(e: MouseEvent): void {
    const isValid = this.validateFields();

    if (isValid) {
      console.log(this.formValues);
      // Router.go('/chats');
    }
    e.preventDefault();
  }

  render() {
    return template;
  }
}
