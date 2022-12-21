import { Router, registerComponent } from 'modules';

import './styles/style.css';

import { Button } from 'components/Button';
import { Link } from 'components/Link';
import {
  InputField, InputFieldPassword, Input, ErrorMessage,
} from 'components/InputField';

registerComponent(Button);
registerComponent(Link);
registerComponent(InputField);
registerComponent(InputFieldPassword);
registerComponent(Input);
registerComponent(ErrorMessage);

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('popstate', (event) => {
    Router.update(event.state.path);
  });
  Router.go(window.location.pathname);
});
