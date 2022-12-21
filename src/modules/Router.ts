import StartPage from 'pages/Start';
import LoginPage from 'pages/Login';
import RegisterPage from 'pages/Register';

import renderDOM from 'modules/renderDOM';

export default class Router {
  static go(path: string) {
    console.log('Router');
    console.log(path);
    Router.update(path);
    window.history.pushState({ path }, '', path);
  }

  static update(path: string) {
    switch (path) {
      case '/login': renderDOM(new LoginPage()); break;
      case '/register': renderDOM(new RegisterPage()); break;
      default: renderDOM(new StartPage());
    }
  }
}
