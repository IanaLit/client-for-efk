/* eslint import/no-cycle: [1, { maxDepth: 2 }] */
import { CategoryCard } from '../components/categoriesPage/categoryCard';
import { WordsPage } from '../components/wordsPage/wordsPage';
import { CategoryService } from './categoryService';

export class WordService {
  static newWord = {
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

  static renderWords() {
    console.log(WordService.category);
    WordService.wordsPage = new WordsPage(WordService.category);
    WordService.wordsPage.render();
  }

  static createWord = async () => {
    const word = await fetch(`${WordService.uri}/admin/words/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //headers: {'Content-Type': 'multipart/form-data' },
        body: JSON.stringify(WordService.newWord),
      });
      // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    const wordId = await word.json().then((data) => data._id);
    console.log(wordId);
    WordService.category.words.push(wordId);
    const cat = {
      id: WordService.categoryId,
      name: WordService.categoryName,
      words: WordService.category.words,
    };
      // const response =  await CategoryService.createCategory(data);
      // return response.json();
    await CategoryService.createCategory(cat);
    return wordId;
  };
}
