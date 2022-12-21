import { Router, Block } from 'modules';
import template from 'bundle-text:./StartPage.hbs';

export class StartPage extends Block {
  constructor() {
    super({ onClick: null });
    this.props.onClick = this.onClick;
  }

  // eslint-disable-next-line class-methods-use-this
  onClick() {
    Router.go('/login');
  }

  render() {
    return template;
  }
}
