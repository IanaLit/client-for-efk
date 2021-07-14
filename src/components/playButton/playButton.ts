/* eslint import/no-cycle: [1, { maxDepth: 2 }] */
import { CardInterface } from '../../interfaces/cardInterface';
import { StateService } from '../../services/stateService';
import './playButton.scss';

export class PlayButton {
  element:HTMLButtonElement;

  static isClicked = false;

  constructor(currentSet:CardInterface[]) {
    this.element = document.createElement('button');
    this.element.innerText = 'Start game';
    this.element.className = 'play-button';
    StateService.playButton = this;

    this.element.addEventListener('click', () => {
      if (!PlayButton.isClicked) {
        StateService.cardsSet = StateService.shuffle(currentSet);
        StateService.gameStart(PlayButton.isClicked);
        this.makeRepeatButton();
        PlayButton.isClicked = true;
      }
      StateService.gameStart(PlayButton.isClicked);
    });
  }

  makeRepeatButton() {
    this.element.innerText = 'Repeat';
    this.element.classList.add('repeat');
  }

  startGameButton() {
    this.element.innerText = 'Start game';
    this.element.classList.remove('repeat');
  }

  removeButton() {
    this.element.classList.add('hidden');
  }

  showButton() {
    this.element.classList.remove('hidden');
  }
}
