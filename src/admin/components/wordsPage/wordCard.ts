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
    WordService.newWord.image = image;
    WordService.newWord.audioSrc = audio;
    this.buttonUpdate = new Button('green', 'update');
    this.buttonCreate = new Button('green', 'create');
    this.buttonAddWord = new Button('green', 'add word');
    this.buttonDelete = new Button('close', '');
    this.buttonCancel = new Button('red', 'cancel');

    this.element.style.height = '410px';
    this.buttonDelete.btnClick = async () => {
      /* eslint-disable-next-line no-param-reassign, no-underscore-dangle */
      /* eslint-disable */
      const { _id } = this;
      this.element.remove();
      await WordService.deleteWord(_id);
    };
    this.buttonUpdate.btnClick = async () => {
      /* eslint-disable-next-line no-param-reassign, no-underscore-dangle */
      /* eslint-disable */
     // const { _id } = this;
      this.element.innerText = '';
      console.log(this);
      this.newWord();
    };
    if (this.inputName) {
      this.inputName.onInput = () => {
        console.log(this.inputName?.element.value);
      };
    }
    this.buttonCreate.btnClick = async () => {
      const newImageUrl = await CloudService.uploadImage()  || this.image;
      const newAudioUrl = await CloudService.uploadAudio() || this.audioSrc;
      const updatedId = this._id ? this._id : '';
      WordService.newWord = {
        _id: this._id ? this._id : '',
        word: this.inputWord ? this.inputWord.element.value : '',
        translation: this.inputTranslation ? this.inputTranslation.element.value : '',
        audioSrc: newAudioUrl,
        image: newImageUrl,
        owner: WordService.categoryId,
      };
      console.log(WordService.newWord);
      newWord = await WordService.createWord();
      this._id = WordService.newWord._id ;
      this.word =  WordService.newWord.word;
      this.image = WordService.newWord.image;
      this.translation = WordService.newWord.translation;
      this.audioSrc = WordService.newWord.audioSrc;
      console.log(newWord);
      this.element.innerText ='';
      this.showWord();
    };
  }
  showWord(){
    console.log(this);
    console.log(WordService.newWord);
    const word = document.createElement('h5');
    word.innerText = WordService.newWord.word || (this.word as string);
    const translate = document.createElement('h5');
    translate.innerText = WordService.newWord.translation || (this.translation as string);
    const image = document.createElement('img');
    image.style.height = '100px';
    image.style.width = '100px';
    image.src = WordService.newWord.image || (this.image as string);
    const audioContainer = document.createElement('audio');
    audioContainer.setAttribute('controls', '');
    const audio = document.createElement('source');
    audio.src = WordService.newWord.audioSrc || (this.audioSrc as string);
    audio.type = 'audio/mpeg';
    audioContainer.appendChild(audio);
    this.element.appendChild(word);
    this.element.appendChild(translate);
    this.element.appendChild(image);
    this.element.appendChild(audioContainer);
    this.element.appendChild(this.buttonUpdate.element);
    this.element.insertAdjacentElement('afterbegin', this.buttonDelete.element);

  }

  newWord() {
    console.log(this);
    const form = document.createElement('form');
    form.className = 'word-form';
    form.enctype = "multipart/form-data";

    this.inputWord = new Input(this.element, 'text');
    if (this.word) this.inputWord.element.value = this.word;
    this.inputWord.element.className = 'input-word';
    this.inputWord.element.placeholder = 'word';
    this.inputWord.element.name = 'word';
    form.appendChild(this.inputWord.element);

    this.inputTranslation = new Input(this.element, 'text');
    if (this.translation) this.inputTranslation.element.value = this.translation;
    this.inputTranslation.element.className = 'input-translation';
    this.inputTranslation.element.placeholder = 'translation';
    this.inputTranslation.element.name =  'translation';
    form.appendChild(this.inputTranslation.element);
    this.setImage(form);
    this.setAudio(form);
    this.element.appendChild(form);
    this.element.appendChild(this.buttonCreate.element);
  }
  setImage(form:HTMLElement){
    if(this.image){
      const oldImg = document.createElement('img');
      oldImg.src= this.image;
      oldImg.style.height = '100px';
      oldImg.style.width ='100px';
      form.appendChild(oldImg);
    }
    
    this.inputImage = new Input(this.element, 'file');
    this.inputImage.element.className = 'input-image';
    this.inputImage.element.name = 'image';
    this.inputImage.element.setAttribute('id', 'image');
    this.inputImage.element.style.display='none';
    if(this.inputImage.element.files){
      CloudService.image = this.inputImage;
    }
    
    const imageLabel = document.createElement('label');
    imageLabel.innerText ='change image';
    imageLabel.setAttribute('for', 'image'); ////???
    imageLabel.className='button green';
    form.appendChild(imageLabel);
    form.appendChild(this.inputImage.element);
  }
  setAudio(form:HTMLElement){
    if(this.audioSrc){
      const audioContainer = document.createElement('audio');
      audioContainer.setAttribute('controls', '');
      const audio = document.createElement('source');
      audio.src = (this.audioSrc as string);
      audioContainer.appendChild(audio);
      audio.type = 'audio/mpeg';
      form.appendChild(audioContainer);
    }
    this.inputAudio = new Input(this.element, 'file');
    this.inputAudio.element.className = 'input-audio';
    this.inputAudio.element.name = 'audio';
    this.inputAudio.element.setAttribute('id', 'audio');
    this.inputAudio.element.style.display='none';
    if(this.inputAudio.element.files){
      CloudService.audio = this.inputAudio;
    }

    const audioLabel = document.createElement('label');
    audioLabel.innerText ='change audio';
    audioLabel.setAttribute('for', 'audio'); ////???
    audioLabel.className='button green';
    form.appendChild(audioLabel);
    
    //this.element.appendChild(this.inputAudio.element);
    form.appendChild(this.inputAudio.element);
  }
}
