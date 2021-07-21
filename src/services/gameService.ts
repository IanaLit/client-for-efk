/* eslint import/no-cycle: [1, { maxDepth: 2 }] */
import { CategoryService } from '../admin/services/categoryService';
import { WordService } from '../admin/services/wordsService';
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

  static currentSet: any[];

  static menuItems: MenuItem[] = [];

  static statistic = new Statistic();
  static getData = async (categoryName:string) => {
    GameService.currentSet = await WordService.getCategoryWords();
    console.log(GameService.currentSet);
    // const a = await WordService.getCategoryWords();
    // console.log(a);
    // const categoryIndex = cards.findIndex((card) => card === categoryName);
    // GameService.currentSet = [];
    // GameService.currentSet = GameService.currentSet.concat(data[categoryIndex]);
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

  // static renderCategories() {
  //   // StateService.clear();
  //   const categories = cards;
  //   const cardUrls: string[] = [];
  //   data.map((set) => cardUrls.push(set[0].image));
  //   categories.forEach((cat, index) => {
  //     const card = new IndexCard(cardUrls[index], cat);
  //     StateService.main.appendChild(card.card);
  //   });
  // }
  static async renderCategories(){
    const categories = await CategoryService.getCategories();
    console.log(categories);
    categories.forEach(async (category:{_id:string, name:string, words:[]}) => {
      WordService.categoryId= category._id;
      const card = new IndexCard(category, './image.jpg');
      StateService.main.appendChild(card.card);
    });

  }


  static renderStatistic() {
    // const statistic = new Statistic();
    Statistic.init();
    document.body.appendChild(GameService.statistic.element);
    GameService.statistic.renderTable('word');
  }

  static changeCategory = async (categoryName:string, category:{_id:string, name:string, words:[]}|null) => {
    StateService.clear();
    const menuItem = GameService.menuItems.find((item) => item.categoryName === categoryName);
    GameService.statistic.clean();
    if (categoryName === 'Main') GameService.renderCategories();
    else if (categoryName === 'Statistic') GameService.renderStatistic();
    else {
      StateService.clear();
      StateService.setCategory(categoryName);
      if(category) WordService.categoryId = category._id;
      StateService.cardsSet = await GameService.getData(categoryName);
      
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
