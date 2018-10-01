class Game{

  constructor(){

    let length = document.getElementById('snakeLength').value;
    let boxSize = document.getElementById('boxSize').value;
    let speed = ( 1000/2)/parseFloat(document.getElementById('snakeSpeed').value);
    let levelSpeed = parseInt(document.getElementById('levels').value);
    let speedValue = parseFloat(document.getElementById('snakeSpeed').value);
    this.levelSpeed = ( 1000/2)/levelSpeed;
    var self = this;
    let canvas = document.getElementById('canvas')
    switch(boxSize){
      case 'small':
      canvas.width = 500;
      canvas.height = 500;
      break;
      case 'medium':
      canvas.width = 600;
      canvas.height = 600;
      break;

      case 'large':
      canvas.width = 700;
      canvas.height = 700;
      break;
    }
    
    this.speed=this.levelSpeed;
    if((levelSpeed==1 && speedValue>=1 && speedValue<3) || 
       (levelSpeed ==3 && speedValue>=3 &&speedValue<5) ||
       ( levelSpeed ==5 && speedValue>=5)
      ){
      this.speed = speed;
    }
   
    this.snake = new Snake(length);
    let apples = parseInt(document.getElementById('apples').value);
    let foods=[];
    for(let i=0; i<apples; i++){
      foods.push(new Food());
    }
    this.foods = foods;
    this.ctx = canvas.getContext('2d');
    this.scale = 20;
    this.nx = Math.floor(canvas.width/this.scale)+1;
    this.ny = Math.floor(canvas.height/this.scale)+1;
  
  }
 
  
   step (){
      this.snake.step(this);
      this.foods.forEach((food) =>{
        food.step(this);
      })
     
      this.draw();
      this.wait();
    };
    draw(){
      this.Rect(0, 0, this.nx, this.ny, 'white');
      this.snake.draw(this);
      this.foods.forEach((food)=>{
        food.draw(this);
      })
    };
    keydown(evt){
      this.snake.keydown(evt.key);
    }
    Rect(x,y,w,h,fs){
      this.ctx.fillStyle = fs;
      this.ctx.fillRect(x*this.scale, y*this.scale, w*this.scale-1, h*this.scale-1)
    };
    wait(){
      
      setTimeout(this.step.bind(this), this.speed);
    };
    run(){
      document.addEventListener('keydown', this.keydown.bind(this));
      this.wait();
    }
   
  }
  
  
  window.onload = function(){
    if(localStorage.getItem('high_score') !== null)
    {
      document.getElementById('high_score').innerHTML=localStorage.getItem('high_score');
    }
    
    
     document.getElementById('startGame').addEventListener('click',function(){
      let game =  new Game();
      game.run();
      document.getElementById('settings').style.display = "none";
     })
  };