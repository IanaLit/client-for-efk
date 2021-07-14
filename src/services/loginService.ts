import { LoginForm } from '../components/loginForm/loginForm';
import { Main } from '../components/main/main';

export class LoginSevice {
  static loginForm:LoginForm;

  static main:Main;

  static showForm() {
    LoginSevice.loginForm.show();
  }
}
