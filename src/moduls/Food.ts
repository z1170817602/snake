//定义食物类
class Food {
  //定义一个属性表示食物所对应的元素
  element:HTMLElement;

  constructor(){
    //获取页面中的food元素并将其赋值给element
    this.element = document.querySelector('#food')!;
  }
  //获取食物坐标
  get X(){
    return this.element.offsetLeft;
  }
  get Y(){
    return this.element.offsetTop;
  }
  //修改食物位置
  change(){
    //生成随机位置  
    //生成0-290的并且是10的倍数随机数
    let top = Math.round(Math.random()*29)*10;
    let left = Math.round(Math.random()*29)*10;
    
    this.element.style.left=left+'px';
    this.element.style.top=top+'px';
  }
}

export default Food ;