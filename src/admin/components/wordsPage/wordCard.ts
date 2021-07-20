/* eslint import/no-cycle: [1, { maxDepth: 2 }] */

import { Button } from '../../../shared/button';
import { Input } from '../../../shared/input';
import './wordsPage.scss';
import '../../../shared/button.scss';
import { WordService } from '../../services/wordsService';
import { CloudService } from '../../services/cloudService';

let newWord;
export class WordCard {
  element: HTMLElement;

  word:string |undefined;

  translation: string|undefined;

  image: string|undefined;

  audioSrc: string|undefined;

  _id:string;

  category:string;

  buttonDelete:Button;

  buttonCreate:Button;

  buttonUpdate:Button;

  buttonAddWord:Button;

  buttonCancel: Button;

  inputName:Input | undefined;

  inputWord:Input |undefined;

  inputTranslation:Input | undefined;

  inputImage:Input | undefined;

  inputAudio:Input | undefined;

  constructor(word = '', translation = '', category = '', id = '', image = '', audio = '') {
    this.element = document.createElement('div');
    this.element.className = 'word-card';
    this.word = word;
    /* eslint-disable-next-line no-param-reassign, no-underscore-dangle */
    this._id = id;
    this.translation = translation;
    this.category = category;
    this.image = image;
    this.audioSrc = audio;

    this.buttonUpdate = new Button('green', 'update');
    this.buttonCreate = new Button('green', 'create');
    this.buttonAddWord = new Button('green', 'add word');
    this.buttonDelete = new Button('close', '');
    this.buttonCancel = new Button('red', 'cancel');
    this.buttonDelete.btnClick = async () => {
      /* eslint-disable-next-line no-param-reassign, no-underscore-dangle */
      /* eslint-disable */
      const { _id } = this;
      this.element.remove();
      // await CategoryService.deleteCategory(id);
    };
    this.buttonUpdate.btnClick = async () => {
      /* eslint-disable-next-line no-param-reassign, no-underscore-dangle */
      /* eslint-disable */
      const { _id } = this;
      this.element.innerText = '';
      // this.newCategory();
    };
    if (this.inputName) {
      this.inputName.onInput = () => {
        console.log(this.inputName?.element.value);
      };
    }
    this.buttonCreate.btnClick = async () => {
      const newImageUrl = await CloudService.uploadImage();
      const newAudioUrl = await CloudService.uploadAudio();
      console.log(newImageUrl);
      WordService.newWord = {
        word: this.inputWord ? this.inputWord.element.value : '',
        translation: this.inputTranslation ? this.inputTranslation.element.value : '',
        audioSrc: newAudioUrl,
        image: newImageUrl,
        owner: WordService.categoryId,
      };
      console.log(WordService.newWord);
      newWord = await WordService.createWord();
      console.log(newWord);
    };
  }

  newWord() {
    const form = document.createElement('form');
    form.className = 'word-form';
    form.enctype = "multipart/form-data";

    this.inputWord = new Input(this.element, 'text');
    if (this.word) this.inputWord.element.value = this.word;
    this.inputWord.element.className = 'input-word';
    this.inputWord.element.placeholder = 'word';
    this.inputWord.element.name = 'word';
    //this.element.appendChild(this.inputWord.element);
    form.appendChild(this.inputWord.element);

    this.inputTranslation = new Input(this.element, 'text');
    if (this.translation) this.inputTranslation.element.value = this.translation;
    this.inputTranslation.element.className = 'input-translation';
    this.inputTranslation.element.placeholder = 'translation';
    this.inputTranslation.element.name =  'translation';
    //this.element.appendChild(this.inputTranslation.element);
    form.appendChild(this.inputTranslation.element);

    this.inputImage = new Input(this.element, 'file');
    if (this.image) this.inputImage.element.value = this.image;
    this.inputImage.element.className = 'input-image';
    this.inputImage.element.name = 'image';
    CloudService.image = this.inputImage;
    //this.element.appendChild(this.inputImage.element);
    form.appendChild(this.inputImage.element);

    this.inputAudio = new Input(this.element, 'file');
    if (this.audioSrc) this.inputAudio.element.value = this.audioSrc;
    this.inputAudio.element.className = 'input-audio';
    this.inputAudio.element.name = 'audio';
    CloudService.audio = this.inputAudio;
    //this.element.appendChild(this.inputAudio.element);
    form.appendChild(this.inputAudio.element);
    this.element.appendChild(form);

    this.element.appendChild(this.buttonCreate.element);
  }
}
