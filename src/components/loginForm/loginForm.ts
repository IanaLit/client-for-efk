import { CategoriesPage } from '../../admin/components/categoriesPage/categoriesPage';
import { AuthService } from '../../admin/services/authService';
import { CategoryService } from '../../admin/services/categoryService';
import { Button } from '../../shared/button';
import { Input } from '../../shared/input';
import '../../shared/button.scss';
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
    this.login.element.name = 'login';
    this.password = new Input(this.inputs, 'password');
    this.password.element.placeholder = 'enter "admin" for password';
    this.password.element.name = 'password';
    this.cancelButton = new Button('red', 'Cancel');
    this.loginButton = new Button('green', 'Login');
    this.buttons.append(this.loginButton.element);
    this.buttons.append(this.cancelButton.element);
    this.adminPage = new CategoriesPage();
    this.cancelButton.btnClick = () => {
      this.show();
    };
    this.loginButton.btnClick = async () => {
      // if(this.login.element.value && this.password.element.value){}

      if (!this.password.element.value) {
        alert('Enter "admin" for password');
      }
      if (!this.login.element.value) {
        alert('Enter "admin" for login');
      }
      const result = await AuthService.login({ login: this.login.element.value, password: this.password.element.value });
      if (result === 'ok') {
        sessionStorage.setItem('login', 'true');
        this.adminPage.render();
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
