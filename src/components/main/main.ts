// import { cards, data } from '../../cards';
import { StateService } from '../../services/stateService';
// import { IndexCard } from '../indexCard/indexCard';
import './main.scss';

export class Main {
  element: HTMLElement;

  constructor(parent: HTMLElement) {
    this.element = document.createElement('main');
    this.element.className = `main ${StateService.gameMode}`;
    parent.appendChild(this.element);
  }

  initState() {
    StateService.main = this.element;
  }
}
