import { Router, Block } from 'modules';
import template from 'bundle-text:./StartPage.hbs';

export class StartPage extends Block {
  protected getStateFromProps() {
    this.state = {
      onClick: () => {
        Router.go('login');
      },
    };
  }

  render() {
    return template;
  }
}
