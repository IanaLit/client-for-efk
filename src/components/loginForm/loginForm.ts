import { CategoriesPage } from '../../admin/components/categoriesPage/categoriesPage';
import { CategoryService } from '../../admin/services/categoryService';
import { Button } from '../../shared/button';
import { Input } from '../../shared/input';
import './loginForm.scss';

export class LoginForm {
  element: HTMLElement;

  login:Input;

  password:Input;

  loginButton:Button;

  cancelButton:Button;

  inputs:HTMLElement;

  buttons:HTMLElement;

  adminPage: CategoriesPage;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'login-form';
    this.inputs = document.createElement('div');
    this.inputs.className = 'inputs-container';
    this.buttons = document.createElement('div');
    this.buttons.className = 'buttons-container';
    this.element.append(this.inputs);
    this.element.append(this.buttons);
    this.login = new Input(this.inputs, 'text');
    this.login.element.placeholder = 'enter "admin" for login';
    this.password = new Input(this.inputs, 'password');
    this.password.element.placeholder = 'enter "admin" for password';
    this.cancelButton = new Button('red', 'Cancel');
    this.loginButton = new Button('green', 'Login');
    this.buttons.append(this.loginButton.element);
    this.buttons.append(this.cancelButton.element);
    this.adminPage = new CategoriesPage();
    this.cancelButton.btnClick = () => {
      this.show();
    };
    this.loginButton.btnClick = () => {
      if (this.login.element.value === 'admin' && this.password.element.value === 'admin') {
        this.adminPage.render();
      } else {
        this.password.element.value = '';
      }
    };
  }

  show() {
    this.element.classList.toggle('visible');
    if (this.element.previousElementSibling) {
      console.log(this.element.previousElementSibling);
      this.element.previousElementSibling.classList.toggle('show-login');
    }
  }
}
