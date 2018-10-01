class Food{
  constructor(){
    this.x =  Math.floor(Math.random()*24);
    this.y =  Math.floor(Math.random()*24);
  }

    step(game){};
    draw(game){
      game.Rect(this.x, this.y, 1, 1, 'red');
    };
    reset (game){
      this.x = Math.floor(Math.random()*game.nx);
      this.y = Math.floor(Math.random()*game.ny);
    };
  }