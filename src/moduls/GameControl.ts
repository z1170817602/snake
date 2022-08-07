//引入其他的类
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
import Food from "./Food";

//游戏控制器 控制其他的类
class GameControl {
  //定义三个属性
  snake:Snake;
  scorePanel:ScorePanel;
  food:Food;
  //创建一个属性来存储蛇的移动方向（也就是按键的方向）
  direction: string = '';
  //创建一个属性用来记录游戏是否结束
  isLive = true;

  constructor(){
    this.food=new Food();
    this.snake=new Snake();
    this.scorePanel=new ScorePanel();

    this.init();
  }

  //游戏初始化 游戏开始
  init(){
    //绑定键盘按键按下的事件 bind???????
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    this.run();
  }

  //创建一个键盘按下的响应函数
  keydownHandler(event:KeyboardEvent){
    //需要检查event.key的值是否合法（用户是否按了方向键）
    this.direction = event.key;
   
  }
  //创建一个控制蛇移动的方法
  run(){
    //根据this.direction 使蛇的位置改变
     let X = this.snake.X;
     let Y = this.snake.Y;
    
     switch (this.direction) {
       case "ArrowUp":
       case "Up":
         Y -= 10;
         break;
       case "ArrowDown":
       case "Down":
         Y += 10;
         break;
       case "ArrowLeft":
       case "Left":
         X -= 10;
         break;
       case "ArrowRight":
       case "Right":
         X += 10;
         break;
    }
    //检查是否吃到食物
    this.checkEat(X,Y)
    //修改蛇的X，Y的值
    //捕获异常
    try {
          this.snake.X = X;
          this.snake.Y = Y;
    } catch (error) {
      alert('GOMEOVER');
      this.isLive = false;
    }

    //开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    
  }
  //定义一个方法，用来检测蛇是否h吃到食物
  checkEat(X:number,Y:number){ 
    if (X === this.food.X && Y === this.food.Y) { 
      //食物的位置要改变
      this.food.change();
      //分数增加
      this.scorePanel.addScore();
      //蛇加一节
      this.snake.addBody();
    }
  }
}

export default GameControl;