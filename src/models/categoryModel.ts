import { Word } from './wordModel';

export class CategoryModel {
  name:string;

  words:Word[] = [];

  constructor(name:string) {
    this.name = name;
  }

  getWords() {
    return this.words;
  }

  addWord(word:Word) {
    this.words.push(word);
  }
}
