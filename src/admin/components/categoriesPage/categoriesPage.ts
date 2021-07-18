/* eslint-disable */
import { CategoryService } from '../../services/categoryService';
import { CategoryCard } from './categoryCard';
import './category.scss';
import { AdminHeader } from '../adminHeader/header';

export class CategoriesPage {
  element: HTMLElement;

  addCard:HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'categories-page';
    this.addCard = document.createElement('div');
    this.addCard.className = 'add-sign';
    this.addCard.onclick = () => {
      this.newCategoryCard();
    };
    const self = this;
    this.element.onscroll = () => {
      if (self) {
        const { scrollTop, clientHeight, scrollHeight } = self.element;
        if (scrollTop + clientHeight >= scrollHeight) {
          self.loadMore();
        }
      }
    };
  }

  loadMore = async () => {
    console.log('load');
    const categories = await CategoryService.getCategories();
    document.body.appendChild(this.element);
    categories.forEach((category:{ name:string, _id:string, words:[] }) => {
      const categoryCard = new CategoryCard(category.name, category._id, category.words);
      this.element.appendChild(categoryCard.element);
      categoryCard.showCategory();
    });
    CategoryService.scip += CategoryService.limit;
  };

  render = async () => {
    document.body.innerText = '';
    const header = new AdminHeader(this.element);
    document.body.appendChild(header.element);
    header.setActive();
    this.loadMore();
    this.createCategoryCard();
  };

  createCategoryCard() {
    const addCardContainer = document.createElement('div');
    addCardContainer.className = 'category-card';
    const header = document.createElement('h4');
    header.innerText = 'Create category';
    addCardContainer.appendChild(header);
    addCardContainer.appendChild(this.addCard);
    this.element.appendChild(addCardContainer);
  }

  newCategoryCard() {
    const categoryCard = new CategoryCard();
    this.element.insertAdjacentElement('beforeend', categoryCard.element);
    categoryCard.newCategory();
  }
}
