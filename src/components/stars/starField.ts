import './starField.scss';

const maxLength = 8;
export class StarField {
  element: HTMLDivElement;

  static count = 0;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'star-field';
  }

  renderStar(right:boolean) {
    this.element.style.display = 'flex';
    const star = document.createElement('div');
    this.element.appendChild(star);
    star.className = right ? 'star right' : 'star fault';
    StarField.count++;
    this.hideStar();
  }

  hideStar() {
    if (StarField.count > maxLength) {
      const { children } = this.element;
      if (StarField.count > maxLength) {
        this.element.firstChild?.remove();
      }
    }
  }

  clear() {
    this.element.style.display = 'none';
    this.element.innerHTML = '';
    StarField.count = 0;
  }
}
