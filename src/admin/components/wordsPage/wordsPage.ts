/* eslint import/no-cycle: [1, { maxDepth: 2 }] */
import { WordService } from '../../services/wordsService';
import { AdminHeader } from '../adminHeader/header';
import { CategoryCard } from '../categoriesPage/categoryCard';
import { WordCard } from './wordCard';

export class WordsPage {
  element: HTMLElement;

  addCard:HTMLElement;

  category: HTMLHeadingElement;

  constructor(category:CategoryCard) {
    WordService.category = category;
    this.category = document.createElement('h3');
    this.category.innerText = category.name ? category.name : '';
    this.element = document.createElement('div');
    this.element.className = 'words-page';
    this.addCard = document.createElement('div');
    this.addCard.className = 'add-sign';
    this.addCard.onclick = () => {
      this.newWordCard();
    };
    const self = this;
    this.element.onscroll = () => {
      if (self) {
        const { scrollTop, clientHeight, scrollHeight } = self.element;
        if (scrollTop + clientHeight >= scrollHeight) {
         WordService.loadMore();
        }
      }
    };
  }

  

  render = async () => {
    document.body.innerText = '';
    const header = new AdminHeader(this.element);
    document.body.appendChild(header.element);
    document.body.appendChild(this.category);
    header.setActive();
    document.body.appendChild(this.element);
    WordService.loadMore();
    this.createWordCard();
  };

  createWordCard() {
    const addCardContainer = document.createElement('div');
    addCardContainer.className = 'category-card';
    const header = document.createElement('h4');
    header.innerText = 'Create word';
    addCardContainer.appendChild(header);
    addCardContainer.appendChild(this.addCard);
    this.element.appendChild(addCardContainer);
  }

  newWordCard() {
    const wordCard = new WordCard();
    this.element.insertAdjacentElement('beforeend', wordCard.element);
    wordCard.newWord();
  }
}
