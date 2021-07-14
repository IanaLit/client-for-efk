import './footer.scss';

export class Footer {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'footer';
  }

  setLinks() {
    const rsLink = document.createElement('a');
    rsLink.href = 'https://rs.school/js/';
    rsLink.className = 'rs-link';
    const year = document.createElement('div');
    year.innerText = '2021';
    year.className = ' year';
    const githubLink = document.createElement('a');
    githubLink.className = 'github-link';
    githubLink.href = 'https://github.com/IanaLit';
    this.element.appendChild(rsLink);
    this.element.appendChild(year);
    this.element.appendChild(githubLink);
  }
}
