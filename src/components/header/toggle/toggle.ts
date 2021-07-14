import { StateService } from '../../../services/stateService';
import './toggle.scss';

export class Toggle {
  label:HTMLLabelElement;

  input:HTMLInputElement;

  span:HTMLSpanElement;

  constructor() {
    this.label = document.createElement('label');
    this.label.classList.add('switch');
    this.input = document.createElement('input');
    this.input.type = 'checkbox';
    this.span = document.createElement('span');
    this.span.classList.add('slider');
    this.label.appendChild(this.input);
    this.label.appendChild(this.span);
    this.span.classList.add('train');
    this.span.innerText = 'train';
    this.label.addEventListener('click', () => {
      if (this.input.checked) {
        this.span.classList.add('play');
        this.span.classList.remove('train');
        this.span.innerText = 'play';
        StateService.setGameMode('play');
      } else {
        this.span.classList.add('train');
        this.span.classList.remove('play');
        this.span.innerText = 'train';
        StateService.setGameMode('train');
      }
    });
  }
}
