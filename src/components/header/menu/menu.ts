import { cards } from '../../../cards';
import { LoginSevice } from '../../../services/loginService';
import { Button } from '../../../shared/button';
import './menu.scss';
import { MenuItem } from './menuItem';

export class Menu {
  menuContainer:HTMLElement;

  menuToggle:HTMLElement;

  menuItems:HTMLElement;

  loginButton:Button;

  constructor() {
    this.menuContainer = document.createElement('div');
    this.menuContainer.className = 'nav-container';
    this.menuContainer.tabIndex = 0;
    this.menuToggle = document.createElement('div');
    this.menuToggle.className = 'nav-toggle';
    this.menuItems = document.createElement('nav');
    this.menuItems.className = 'nav-items';
    this.menuContainer.appendChild(this.menuToggle);
    this.menuContainer.appendChild(this.menuItems);
    this.loginButton = new Button('login-trigger', 'login');

    this.loginButton.btnClick = () => {
      LoginSevice.showForm();
    };
    this.menuToggle.addEventListener('click', () => {
      if (this.menuContainer.classList.contains('is-active')) {
        this.menuContainer.classList.remove('is-active');
      } else {
        this.menuContainer.classList.add('is-active');
      }
    });
    this.menuContainer.addEventListener('blur', () => {
      this.menuContainer.classList.remove('is-active');
    });
    this.menuItems.addEventListener('click', (e) => {
      this.menuContainer.classList.remove('is-active');
    });
  }

  setMenuItems() {
    this.menuItems.append(new MenuItem('Main').element);
    cards.map((card) => this.menuItems.append(new MenuItem(card).element));
    this.menuItems.append(new MenuItem('Statistic').element);
    this.menuItems.appendChild(this.loginButton.element);
  }
}
