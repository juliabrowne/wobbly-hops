export default class Paddle {
  constructor(args) {
    this.position = args.position;
    this.width = 100;
    this.height = 25;
    this.velocity = 1;
  }
  render(ctx) {
    this.position.y = this.position.y + this.velocity;
    ctx.fillRect(this.position.x, this.position.y, 100, 25);
  }
}
