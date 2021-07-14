export class Word {
  word:string;

  translate;

  trainClicks = 0;

  errorClicks = 0;

  successClicks = 0;

  successPercent = 0;

  category = '';

  constructor(word:string, translate:string, category: string) {
    this.word = word;
    this.translate = translate;
    this.category = category;

    if (localStorage.getItem(this.word) === null || undefined) {
      localStorage.setItem(this.word, JSON.stringify(this.saveObject()));
    } else {
      const str = localStorage.getItem(this.word);
      if (str !== null) {
        const obj = JSON.parse(str);
        this.translate = obj.translate;
        this.category = obj.category;
        this.errorClicks = obj.errors;
        this.successClicks = +obj.playClicks - obj.errors;
        this.trainClicks = obj.train;
        this.successPercent = obj.percent;
      }
    }
  }

  getPercent() {
    return Math.round((1 - this.errorClicks / (this.successClicks + this.errorClicks)) * 100);
  }

  saveObject() {
    return {
      category: this.category,
      translate: this.translate,
      errors: this.errorClicks,
      playClicks: this.errorClicks + this.successClicks,
      train: this.trainClicks,
      percent: this.getPercent(),
    };
  }
}
