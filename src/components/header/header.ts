import { Menu } from './menu/menu';
import { Toggle } from './toggle/toggle';
import './header.scss';
import { StateService } from '../../services/stateService';

export class Header {
  element:HTMLElement;

  switch:Toggle;

  menu:Menu;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'header train';
    this.menu = new Menu();
    this.menu.setMenuItems();
    this.element.appendChild(this.menu.menuContainer);
    this.switch = new Toggle();
    this.element.appendChild(this.switch.label);
    StateService.header = this.element;
  }
}
