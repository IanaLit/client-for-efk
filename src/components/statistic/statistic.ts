import { cards, data } from '../../cards';
import './statistic.scss';

let order = 1;
export class Statistic {
  element:HTMLTableElement;

  head: HTMLTableRowElement;

  constructor() {
    this.element = document.createElement('table');
    this.element.classList.add('statistic');
    this.head = document.createElement('tr');

    this.head.onclick = (e) => {
      order = -order;
      const sort = (e.target as HTMLElement).innerText;
      this.renderTable(sort);
    };
  }

  static getAllFromStorage() {
    const result = [];
    const keys = Object.keys(localStorage);
    let i = keys.length;
    while (i--) {
      const str = localStorage.getItem(keys[i]);
      const obj = str ? JSON.parse(str) : '';
      obj.word = keys[i];
      result.push(obj);
    }
    return result;
  }

  static init() {
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < 8; j++) {
        const key = data[i][j].word;
        if (localStorage.getItem(key) === null) {
          localStorage.setItem(key, JSON.stringify({
            category: cards[i],
            translate: data[i][j].translation,
            errors: 0,
            playClicks: 0,
            train: 0,
            percent: 0,
          }));
        }
      }
    }
  }

  renderTable(sort = 'word') {
    const words = Statistic.getAllFromStorage().sort((a, b) => (a[`${sort}`] > b[`${sort}`] && order) || -order);
    this.clean();
    this.head.classList.add('head');
    this.head.insertAdjacentHTML('afterbegin', '<th>word</th><th>category</th><th>translate</th><th>errors</th><th>playClicks</th><th>train</th><th>percent</th>');
    this.element.appendChild(this.head);
    for (let i = 0; i < words.length; i++) {
      const row = document.createElement('tr');
      this.element.appendChild(row);
      row.insertAdjacentHTML('beforeend', `<td>${words[i].word}</td>
      <td>${words[i].category}</td><td>${words[i].translate}</td>
      <td>${words[i].errors}</td><td>${words[i].playClicks}</td>
      <td>${words[i].train}</td><td>${words[i].percent === null ? 0 : words[i].percent}%</td>`);
    }
  }

  clean() {
    this.head.innerText = '';
    this.element.innerHTML = '';
  }
}
