export class Input {
  element: HTMLInputElement;

  onInput: ((x?:string|null) => void);

  constructor(parentNode:HTMLElement | null = null, type = 'text') {
    this.element = document.createElement('input');
    this.element.className = 'input';
    this.element.type = type;
    parentNode?.appendChild(this.element);
    this.onInput = () => {};
    this.element.addEventListener('change', () => {
      if (this.onInput) this.onInput();
    });
  }
}
