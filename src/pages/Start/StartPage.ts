import { Router, Block } from 'modules';
import template from 'bundle-text:./StartPage.hbs';

export class StartPage extends Block {
  constructor() {
    super();
    this.setProps({ onClick: this.onClick });
  }

  onClick() {
    Router.go('login');
  }

  render() {
    return template;
  }
}
