class Snake{

  constructor(length) {
    this.l = length;
    this.trace = [];
    this.x =  Math.floor(Math.random()*22);
    this.y =  Math.floor(Math.random()*22);
    this.score = 0;
    this.vx = 1;
    this.vy = 0;
    this.highScore =0;
    this.applesCount = 0;
  }

 

  set highScore(score){
      let highScore = localStorage.getItem('high_score');
      if(highScore == null){
        localStorage.setItem('high_score',0);
      }
      if( highScore< score)
      {
        this._highScore = score;
        localStorage.setItem('high_score',score);
        document.getElementById('high_score').innerHTML=score;
      }
  }
  get highScore(){
    return localStorage.getItem('high_score')
  }
  eat() {
    this.score+=10;
    this.applesCount++;
    document.getElementById('score_value').innerHTML = this.score;
  }
  step(game){
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    let canvas = document.getElementById('canvas')
    let apples = parseInt(document.getElementById('apples').value);
    if(this.x >= game.nx) this.x = 0;
    if(this.y >= game.ny) this.y = 0;
    if(this.x < 0 ) this.x = game.nx - 1;
    if(this.y < 0 ) this.y = game.ny - 1;
    for(var i=0; i<this.trace.length; i++){
      var pos = this.trace[i]; 
      game.foods.forEach((food)=>{
      if( pos.x == food.x && pos.y == food.y ){
        this.l++;
        this.eat();
        food.reset(game);
      }
      })       
      
      if(pos.x == this.x && pos.y == this.y) {
        this.die();
      }
      
    
     if(pos.x ==-1 || pos.y== -1 || pos.x == canvas.width/20 || pos.y == canvas.height/20)  {
      this.die();
     } 
    }
    this.trace.push({x: this.x, y: this.y});
    while(this.trace.length > this.l) this.trace.shift();
  };
  die(){
    this.l = 2;
    this.x =  Math.floor(Math.random()*22);
    this.y =  Math.floor(Math.random()*22);
    this.vx = 1;
    this.vy = 0;
    this.highScore = this.score;
    this.score = 0;
    document.getElementById('settings').style.display = "block";
   delete this.trace;
  }
  draw(game){
    for(var i=0; i<this.trace.length; i++){
      var pos = this.trace[i];
      game.Rect(pos.x, pos.y, 1, 1, 'black');
    }
  };
 keydown(key){
    if(key == 'ArrowDown'){
      this.vx = 0;
      this.vy = 1;
    } else if(key == 'ArrowUp'){
      this.vx = 0;
      this.vy =-1;
    } else if(key == 'ArrowLeft'){
      this.vx =-1;
      this.vy = 0;
    } else if(key == 'ArrowRight'){
      this.vx = 1;
      this.vy = 0;
    }
  };
}