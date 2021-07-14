/* eslint import/no-cycle: [1, { maxDepth: 2 }] */
import { CardInterface } from '../../interfaces/cardInterface';
import { Word } from '../../models/wordModel';
import { StateService } from '../../services/stateService';
import './gameCard.scss';

export class GameCard {
  front: HTMLElement;

  frontFooter: HTMLElement;

  rotateButton: HTMLButtonElement;

  audio: HTMLAudioElement;

  text: HTMLElement;

  img: HTMLImageElement;

  element: HTMLDivElement;

  content: HTMLDivElement;

  back: HTMLDivElement;

  imgFront: HTMLImageElement;

  model;

  constructor(card:CardInterface, category:string) {
    this.element = document.createElement('div');
    this.element.className = 'card';
    this.content = document.createElement('div');
    this.content.className = 'content';
    this.element.appendChild(this.content);
    // front
    this.front = document.createElement('div');
    this.front.className = 'front';
    this.imgFront = document.createElement('img');
    this.imgFront.src = card.image;
    this.front.appendChild(this.imgFront);

    this.frontFooter = document.createElement('div');
    this.frontFooter.className = 'front-footer';
    this.front.appendChild(this.frontFooter);
    this.text = document.createElement('span');
    this.text.className = 'card-text';
    this.text.innerHTML = card.word;
    this.frontFooter.appendChild(this.text);
    this.audio = document.createElement('audio');
    this.audio.src = card.audioSrc;
    this.frontFooter.appendChild(this.audio);
    this.rotateButton = document.createElement('button');
    this.rotateButton.className = 'rotate-button';
    this.frontFooter.appendChild(this.rotateButton);

    // back
    this.back = document.createElement('div');
    this.back.className = 'back';
    this.img = document.createElement('img');
    this.img.src = card.image;
    this.back.appendChild(this.img);
    this.text = document.createElement('span');
    this.text.className = 'card-text';
    this.text.innerHTML = card.translation;
    this.back.appendChild(this.text);
    this.content.appendChild(this.front);
    this.content.appendChild(this.back);
    this.model = new Word(card.word, card.translation, category);

    this.imgFront.addEventListener('click', () => {
      StateService.clickPlay(card, this.element, this);
    });
    this.rotateButton.addEventListener('click', () => {
      this.element.classList.add('rotate');
    });
    this.element.addEventListener('mouseleave', () => {
      this.element.classList.remove('rotate');
    });
  }
}
