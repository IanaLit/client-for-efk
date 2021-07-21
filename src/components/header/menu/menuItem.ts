/* eslint import/no-cycle: [1, { maxDepth: 2 }] */
import { GameService } from '../../../services/gameService';

export class MenuItem {
  element:HTMLElement;

  categoryName;

  constructor(categoryName:string) {
    this.element = document.createElement('a');
    this.element.className = 'nav-item';
    this.categoryName = categoryName;
    this.element.innerHTML = this.categoryName;
    GameService.menuItems.push(this);
    this.element.onclick = () => {
      GameService.changeCategory(categoryName, null);
    };
  }
}
