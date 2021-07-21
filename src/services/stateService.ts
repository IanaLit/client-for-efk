/* eslint import/no-cycle: [1, { maxDepth: 2 }] */
import { GameCard } from '../components/gameCard/gameCard';
import { PlayButton } from '../components/playButton/playButton';
import { StarField } from '../components/stars/starField';
import { CardInterface } from '../interfaces/cardInterface';
import { GameService } from './gameService';

export class StateService {
  static raiting:StarField;

  static main:HTMLElement;

  static header:HTMLElement;

  static currentCategory:string;

  static cardsSet:CardInterface[];

  static gameMode = 'train';

  static points = 0;

  static errors = 0;

  static currentWord = '';

  static currentPosition = 7;

  static playButton:PlayButton;

  static gameStarted = false;

  static clear = () => {
    if (StateService.main) {
      StateService.main.innerHTML = '';
    }
  };

  static setCategory(category:string) {
    StateService.currentCategory = category;
  }

  static setSettings() {
    // StateService.gameMode = 'train';

    StateService.points = 0;

    StateService.errors = 0;

    StateService.currentWord = '';

    StateService.currentPosition = 7;
    StateService.currentCategory = 'Clothes';

    StateService.cardsSet = [];
  }

  static setGameMode = (mode:string) => {
    // console.log("set mode");
    StateService.gameMode = mode;
    StateService.main.classList.toggle(`${StateService.gameMode}`);
    StateService.header.classList.toggle(`${StateService.gameMode}`);
    if (StateService.cardsSet) GameService.renderPlayButton();
    if (StateService.gameMode === 'train') StateService.raiting.clear();
  };

  static compare = (card:CardInterface, element:HTMLDivElement, cardObject:GameCard) => {
    if (card.word === StateService.currentWord) {
      element.classList.add('disable');
      StateService.points++;
      StateService.raiting.renderStar(true);
      new Audio('/audio/success-sound.mp3').play();
      StateService.cardsSet.pop();
      StateService.currentPosition--;
      cardObject.model.successClicks++;
      localStorage.setItem(cardObject.model.word, JSON.stringify(cardObject.model.saveObject()));
    } else {
      cardObject.model.errorClicks++;
      // console.log('error:', cardObject.model.errorClicks);
      StateService.cardsSet = StateService.shuffle(StateService.cardsSet);
      StateService.errors++;
      StateService.raiting.renderStar(false);
      new Audio('/audio/error-sound.mp3').play();
      localStorage.setItem(cardObject.model.word, JSON.stringify(cardObject.model.saveObject()));
    }
    StateService.gameStarted = false;
    if (StateService.points === 8) {
      StateService.endGame(card, element);
    }
  };

  static endGame(card: CardInterface, element: HTMLDivElement) {
    StateService.clear();
    setTimeout(() => {
      if (!StateService.errors) {
        StateService.main.classList.add('win');
        new Audio('/audio/success.mp3').play();
      } else {
        StateService.main.classList.add('looser');
        StateService.raiting.element.classList.add('error');
        StateService.raiting.element.innerHTML = '';
        StateService.raiting.element.style.display = 'flex';
        StateService.raiting.element.innerText = `you have ${StateService.errors} errors`;
        new Audio('/audio/failure.mp3').play();
      }
    }, 3000);
    setTimeout(() => {
      StateService.clear();
      StateService.main.classList.remove('win');
      StateService.main.classList.remove('looser');
      StateService.raiting.clear();
      StateService.playButton.startGameButton();
      StateService.playButton.removeButton();
      GameService.renderCategories();
      this.setSettings();
      PlayButton.isClicked = false;
    }, 6000);
  }

  static shuffle = (cards:CardInterface[]) => {
    let j; let
      tmp;
    for (let i = cards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = cards[j];
      cards[j] = cards[i];
      cards[i] = tmp;
    }
    return cards;
  };

  static clickPlay = (card: CardInterface, element:HTMLDivElement, cardObject:GameCard) => {
    if (StateService.gameMode === 'train') {
      new Audio(card.audioSrc).play();
      cardObject.model.trainClicks++;
      localStorage.setItem(cardObject.model.word, JSON.stringify(cardObject.model.saveObject()));
    } else if (StateService.gameStarted) {
      StateService.compare(card, element, cardObject);
      if (StateService.cardsSet.length) {
        setTimeout(StateService.gameStart, 1000);
      }
    }
  };

  static gameStart = (isClicked:boolean) => {
    console.log(StateService.cardsSet, StateService.currentPosition);
    StateService.gameStarted = true;
    new Audio(StateService.cardsSet[StateService.currentPosition].audioSrc).play();
    if (!isClicked) {
      StateService.currentWord = StateService.cardsSet[StateService.currentPosition].word;
    }
  };
}
