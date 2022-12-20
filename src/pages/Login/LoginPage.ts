import Block from 'modules/Block';

import template from 'bundle-text:./LoginPage.hbs';
import './LoginPage.css';

export class LoginPage extends Block {
  getStateFromProps() {
    this.state = {
      loginValue: '',
      passwordValue: '',
      onSubmit: () => {
        console.log(this.refs.login);
      },
    };
  }

  render() {
    return template;
  }
}
