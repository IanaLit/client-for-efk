import { Button } from '../../../shared/button';
import { Input } from '../../../shared/input';
import './category.scss';
import '../../../shared/button.scss';
import { CategoryService } from '../../services/categoryService';
import { WordService } from '../../services/wordsService';
import { WordCard } from '../wordsPage/wordCard';

let newCategoryName = '';
export class CategoryCard {
  element: HTMLElement;

  name:string |undefined;

 id:string;

  words: string[];
  // word:string,
  // translation:string,
  // audioSrc:string,
  // image:string,
  // owner:string}

  buttonDelete:Button;

  buttonCreate:Button;

  buttonUpdate:Button;

  buttonAddWord:Button;

  buttonCancel: Button;

  inputName:Input | undefined;

  constructor(name = '', id = '', words:[] = []) {
    this.element = document.createElement('div');
    this.element.className = 'category-card';
    this.name = name;
    this.id = id;
    this.words = words;


    this.buttonUpdate = new Button('green', 'update');
    this.buttonCreate = new Button('green', 'create');
    this.buttonAddWord = new Button('green', 'add word');
    this.buttonDelete = new Button('close', '');
    this.buttonCancel = new Button('red', 'cancel');


    this.buttonAddWord.btnClick = async() =>{
      console.log(this);
      WordService.category = this;
      if(this.name) WordService.categoryName = this.name;
      if(this.id) WordService.categoryId = this.id;
      WordService.renderWords();
    }
    this.buttonDelete.btnClick = async () => {
      const { id } = this;
      this.element.remove();
      await CategoryService.deleteCategory(id);
    };
    this.buttonUpdate.btnClick = async() =>{
      const { id } = this;
      this.element.innerText = '';
      this.newCategory();
    }
    if (this.inputName) {
      this.inputName.onInput = () => {
        console.log(this.inputName?.element.value);
      };
    }
    this.buttonCreate.btnClick = async () => {
      newCategoryName = (this.inputName?.element.value as string);
      console.log(newCategoryName);
      if (newCategoryName) {
        const updatedId = this.id? this.id :'';
        const newCategory = await CategoryService.createCategory( {id: updatedId,name: newCategoryName, words:this.words });
        console.log(newCategory);
        WordService.category = newCategory;
        this.element.innerText = '';
        this.name = newCategory.name;
        this.id = newCategory._id;
        this.words = newCategory.words;
        this.showCategory();
      }
    };
    this.buttonDelete;
  }

  createButtonGroup(button1:Button, button2:Button) {
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    buttonGroup.appendChild(button1.element);
    buttonGroup.appendChild(button2.element);
    return buttonGroup;
  }

  showCategory() {
    //console.log(this);
    const header = document.createElement('h4');
    if (this.name) header.innerText = this.name;
    const words = document.createElement('div');
    words.innerText = String(this.words ? this.words.length : 0);
    this.element.appendChild(header);
    this.element.appendChild(words);
    this.element.appendChild(this.createButtonGroup(this.buttonUpdate, this.buttonAddWord));
    this.element.insertAdjacentElement('afterbegin', this.buttonDelete.element);
  }

  newCategory() {
    this.inputName = new Input(this.element, 'text');
    if (this.name) this.inputName.element.value = this.name;
    this.inputName.element.className = 'input-category-name';
    this.element.appendChild(this.inputName.element);
    this.element.appendChild(this.createButtonGroup(this.buttonCancel, this.buttonCreate));
  }
}
