export default class Cell {
  public active = false;
  public color?:string;

  get className() {
    return [
      'cell',
      this.active && 'active',
    ].filter(c => !!c).join(' ');
  }

  public activate(color?:string) {
    this.active = true;
    this.color = color;
  }

  get clone() {
    const out = new Cell();
    if(this.active) {
      out.activate(this.color);
    }
    return out;
  }
}