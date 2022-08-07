//定义表示记分牌的类
class ScorePanel{
  //记录分数和等级
  score = 0;
  level = 0;
  //分数和等级所在的元素，
  scoreEle:HTMLElement;
  levelEle:HTMLElement;
  //设置一个变量限制等级
  maxLevel:number;
  //设置一个变量表示多少分升一级
  upScore :number;

  constructor(maxLevel:number = 10,upScore:number = 10){
    this.scoreEle=document.querySelector('#score')!;
    this.levelEle=document.querySelector('#level')!;
    this.maxLevel=maxLevel;
    this.upScore=upScore
  }

  //设置加分的方法
  addScore(){
    this.score++;
    this.scoreEle.innerHTML = this.score + '';
    //判断分数多少 10分一级
    if(this.score % this.upScore === 0){
      this.levelUp();
    }
  }

  // 升级的方法
  levelUp(){
    if(this.level<this.maxLevel){
      this.level++;
      this.levelEle.innerHTML = this.level + ''; 
    }
  }
}

export default  ScorePanel ;