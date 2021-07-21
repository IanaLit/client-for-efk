/* eslint-disable */ 
/* eslint import/no-cycle: [1, { maxDepth: 2 }] */
import { WordService } from '../../admin/services/wordsService';
import { CategoryModel } from '../../models/categoryModel';
import { GameService } from '../../services/gameService';
import './indexCard.scss';

// const indexCards = cards;
export class IndexCard {
  card:HTMLElement;

  cardBody:HTMLElement;

  cardFooter:HTMLElement;

  cardText:string;

  categoryModel;

  categoryId: string;

  constructor(category:{ _id:string, name:string, words:[] }, src: string) {
    this.categoryId = category._id;
    this.card = document.createElement('div');
    this.card.className = 'index-card';
    this.cardBody = document.createElement('div');
    this.cardBody.className = 'index-card-body';
    this.cardFooter = document.createElement('div');
    this.cardFooter.className = 'index-card-footer';
    this.cardFooter.innerHTML = `<img src="${src}" alt="card"/><h4 class ="index-card-text">${category.name}</h4>`;
    this.card.appendChild(this.cardBody);
    this.card.appendChild(this.cardFooter);
    this.cardText = category.name;
    this.categoryModel = new CategoryModel(category.name);
    this.card.onclick = () => {
      GameService.changeCategory(category.name, category);
      // WordService.categoryId = category._id;
    };
  }
}
