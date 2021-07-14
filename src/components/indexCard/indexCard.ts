/* eslint import/no-cycle: [1, { maxDepth: 2 }] */
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

  constructor(src: string, text: string) {
    this.card = document.createElement('div');
    this.card.className = 'index-card';
    this.cardBody = document.createElement('div');
    this.cardBody.className = 'index-card-body';
    this.cardFooter = document.createElement('div');
    this.cardFooter.className = 'index-card-footer';
    this.cardFooter.innerHTML = `<img src="${src}" alt="card"/><h4 class ="index-card-text">${text}</h4>`;
    this.card.appendChild(this.cardBody);
    this.card.appendChild(this.cardFooter);
    this.cardText = text;
    this.categoryModel = new CategoryModel(text);
    this.card.onclick = () => {
      GameService.changeCategory(text);
    };
  }
}
