/* eslint-disable */ 
import { Button } from '../../../shared/button';
import './header.scss';

export class AdminHeader {
  element:HTMLElement;

  words:HTMLElement;

  categories:HTMLElement;

  logout:Button;

  parent: HTMLElement;

  constructor(parent:HTMLElement) {
    this.parent = parent;
    this.element = document.createElement('div');
    this.element.className = 'admin-header';
    parent.appendChild(this.element);
    const navigation = document.createElement('ul');
    navigation.className = 'nav-header';
    this.element.appendChild(navigation);
    this.categories = document.createElement('li');
    this.categories.innerText = 'categories';
    this.words = document.createElement('li');
    this.words.innerText = 'words';
    navigation.appendChild(this.categories);
    navigation.appendChild(this.words);
    this.logout = new Button('logout', 'logout');
    this.element.appendChild(this.logout.element);
    this.logout.btnClick = () => {
      sessionStorage.clear();
      document.body.innerText = '';
      location.href = '/index.html';
    };
  }

  setActive() {
    const active = this.parent.className.split('-')[0];
    if (this.categories.innerText === active) this.categories.classList.toggle('active-page');
    if (this.words.innerText === active) this.words.classList.toggle('active-page');
    // el.classList.toggle('active-page');
  }
}
