/* eslint import/no-cycle: [1, { maxDepth: 2 }] */
import { CategoryCard } from '../components/categoriesPage/categoryCard';
import { WordCard } from '../components/wordsPage/wordCard';
import { WordsPage } from '../components/wordsPage/wordsPage';
import { CategoryService } from './categoryService';

export class WordService {
  static newWord = {
    _id:'',
    word: '',
    translation: '',
    audioSrc: '',
    image: '',
    owner: '',
  };

  static uri = 'http://localhost:3000';

  static categoryName:string;

  static categoryId:string;

  static category:CategoryCard;

  static wordsPage:WordsPage;

  static renderWords = async()=> {
    console.log(WordService.category);
    WordService.wordsPage = new WordsPage(WordService.category);
    WordService.wordsPage.render();
    const words = await WordService.getCategoryWords();
    words.forEach((word: { word: string | undefined; translation: string | undefined; owner: string | undefined; _id: string | undefined; image: string | undefined; audioSrc: string | undefined; }) => {
      const wordCard = new WordCard(word.word, word.translation, word.owner, word._id, word.image, word.audioSrc);
      wordCard.showWord();
      WordService.wordsPage.element.appendChild(wordCard.element);
    });
  }

  static getCategoryWords = async () => {
    console.log('getWords', WordService.category.id);
    const response = await fetch(`${CategoryService.uri}/admin/categories/words/${WordService.category.id}`);
    return response.json();
  }

  static createWord = async () => {
    const word = await fetch(`${WordService.uri}/admin/categories/words/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //headers: {'Content-Type': 'multipart/form-data' },
        body: JSON.stringify(WordService.newWord),
      });
      // eslint-disable-next-line no-param-reassign, no-underscore-dangle
      const wordId = await word.json().then((data) => data._id);
      if( WordService.newWord._id === ''){
        
    console.log(wordId);
    WordService.category.words.push(wordId);
    }
    const cat = {
      id: WordService.categoryId,
      name: WordService.categoryName,
      words: WordService.category.words,
    };
    await CategoryService.createCategory(cat);
    return wordId;
      
    
  };
  static deleteWord = async (id: string) => {
    const index = WordService.category.words.findIndex(word => word === id);
    WordService.category.words.splice(index, 1);
    const updatedCategory = {
      id: (WordService.category.id as string),
      name: (WordService.category.name as string),
      words: WordService.category.words
    }
    await CategoryService.createCategory(updatedCategory);
    const response = await fetch(`${CategoryService.uri}/admin/categories/words/${id}`,
      {
        method: 'DELETE',
      });
  };
}
