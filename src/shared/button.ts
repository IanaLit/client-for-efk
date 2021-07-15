import './button.scss';
export class Button {
  element: HTMLAnchorElement;

  btnClick:(() => void) | undefined;

  constructor(style = 'button', content = 'button') {
    this.element = document.createElement('a');
    this.element.innerText = content;
    this.element.className = 'button';
    this.element.classList.add(style);
    this.element.onmousedown = () => {
      if (this.btnClick) this.btnClick();
    };
  }
}
