export default class Cell {
  constructor(
    public active = false,
    public color?:string,
  ) {}

  activate(color:string) {
    this.active = true;
    this.color = color;
  }

  get className() {
    return [
      'cell',
      this.active && 'active',
    ].filter(c => !!c).join(' ');
  }
}