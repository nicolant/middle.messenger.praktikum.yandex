import StartPage from 'pages/Start';
import LoginPage from 'pages/Login';

import renderDOM from 'modules/renderDOM';

export default class Router {
  static go(path: string) {
    Router.update(path);
    window.history.pushState({ path }, '', path);
  }

  static update(path: string) {
    switch (path) {
      case 'login': renderDOM(new LoginPage()); break;
      default: renderDOM(new StartPage());
    }
  }
}
