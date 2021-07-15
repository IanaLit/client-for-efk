import { WordService } from "../../services/wordsService";
import { adminHeader } from "../adminHeader/header";
import { CategoryCard } from "../categoriesPage/categoryCard";
import { WordCard } from "./wordCard";

export class WordsPage{
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
  }

  render = async () => {
    document.body.innerText = '';
    const header = new adminHeader(this.element);
    document.body.appendChild(header.element);
    document.body.appendChild(this.category);
    header.setActive();
    document.body.appendChild(this.element);
    this.createWordCard()
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
