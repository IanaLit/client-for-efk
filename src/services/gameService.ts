/* eslint import/no-cycle: [1, { maxDepth: 2 }] */
import { cards, data } from '../cards';
import { GameCard } from '../components/gameCard/gameCard';
import { MenuItem } from '../components/header/menu/menuItem';
import { IndexCard } from '../components/indexCard/indexCard';
import { PlayButton } from '../components/playButton/playButton';
import { Statistic } from '../components/statistic/statistic';
import { CardInterface } from '../interfaces/cardInterface';
import { StateService } from './stateService';

// const indexCards: IndexCard[] =[];

export class GameService {
  static playButton: HTMLButtonElement;

  static currentSet: CardInterface[] = [];

  static menuItems: MenuItem[] = [];

  static statistic = new Statistic();

  // static makePath = (categoryName: string) => categoryName.replace('(', '').replace(')', '').toLowerCase().split(' ')
  //   .join('-');

  // static removeCards =()=>{
  //   while (StateService.main.firstChild) {
  //     if(StateService.main.lastChild)StateService.main.removeChild(StateService.main.lastChild);
  //   }
  // }
  static getData = (categoryName:string) => {
    const categoryIndex = cards.findIndex((card) => card === categoryName);
    GameService.currentSet = [];
    GameService.currentSet = GameService.currentSet.concat(data[categoryIndex]);
    // console.log(data);
    return GameService.currentSet;
  };

  static renderCards() {
    GameService.currentSet.forEach((card) => {
      const cardObject = new GameCard(card, StateService.currentCategory);
      StateService.main.appendChild(cardObject.element);
    });
  }

  static initStorage(card:GameCard) {
    card.model.category = StateService.currentCategory;
    localStorage.setItem(card.model.word, JSON.stringify(card.model.saveObject));
  }

  static renderPlayButton() {
    StateService.playButton?.element.remove();
    if (StateService.gameMode === 'play') {
      document.body.appendChild(new PlayButton(GameService.currentSet).element);
    }
  }

  static renderCategories() {
    // StateService.clear();
    const categories = cards;
    const cardUrls: string[] = [];
    data.map((set) => cardUrls.push(set[0].image));
    categories.forEach((cat, index) => {
      const card = new IndexCard(cardUrls[index], cat);
      StateService.main.appendChild(card.card);
    });
  }

  static renderStatistic() {
    // const statistic = new Statistic();
    Statistic.init();
    document.body.appendChild(GameService.statistic.element);
    GameService.statistic.renderTable('word');
  }

  static changeCategory = (categoryName:string) => {
    StateService.clear();
    const menuItem = GameService.menuItems.find((item) => item.categoryName === categoryName);
    GameService.statistic.clean();
    if (categoryName === 'Main') GameService.renderCategories();
    else if (categoryName === 'Statistic') GameService.renderStatistic();
    else {
      StateService.clear();
      StateService.setCategory(categoryName);
      StateService.cardsSet = GameService.getData(categoryName);
      GameService.renderCards();
      GameService.renderPlayButton();
    }
    if (menuItem) GameService.changeActiveStyle(menuItem.element);
  };

  static changeActiveStyle = (category: HTMLElement) => {
    category.classList.add('active');
    let sibling = category.parentNode?.firstChild;
    while (sibling) {
      if (sibling !== category)(sibling as HTMLElement).classList.remove('active');
      sibling = sibling.nextSibling;
    }
  };
}
