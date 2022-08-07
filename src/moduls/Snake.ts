class Snake{
  //表示蛇头的元素
  head:HTMLElement;
  //蛇的身体（包括蛇头）
  bodies:HTMLCollection;
  //获取蛇的容器
  element:HTMLElement;

  constructor(){
    this.element= document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div')!;
    this.bodies = this.element.getElementsByTagName('div');
  }

  //获取蛇的坐标(蛇头坐标)
  get X (){
    return this.head.offsetLeft;
  }
  get Y (){
    return this.head.offsetTop;
  }

  //设置蛇的坐标
  set X(value) {
    //如果新值和旧值相同，则直接返回不再修改
    if (this.X === value) { 
      return;
    }

    //x的值的合法范围0-290之间
    if (value < 0 || value > 290) { 
      //进入判断说明蛇撞墙了
      throw new Error('蛇死了');
    }
    
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) { 
      if (value > this.X) {
        //如果新值value大于旧值X，说明蛇再向右走，此时掉头的话，听该使蛇继续向前走
        value = this.X - 10;
      } else { 
        //向左走 反正掉头 使蛇继续向左走
        value = this.X + 10;
      }
    }
    this.moveBody();
    this.head.style.left = value + 'px'
    this.cheakHeadBody();
  }

  set Y(value) {
     if (this.Y === value) { 
      return;
    }
      if (value < 0 || value > 290) { 
      //进入判断说明蛇撞墙了,抛出一个异常
      throw new Error('蛇死了');
    }
  if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) { 
      if (value > this.Y) {
        //如果新值value大于旧值Y，说明蛇再向右走，此时掉头的话，听该使蛇继续向前走
        value = this. Y- 10;
      } else { 
        //向左走 反正掉头 使蛇继续向左走
        value = this.Y+ 10;
      }
    }
    this.moveBody();
    this.head.style.top = value + 'px';

    this.cheakHeadBody();
  }

  //蛇增加身体的方法
  addBody(){
    //想element中添加一个div  beforeend结束标签的前面
    this.element.insertAdjacentHTML("beforeend","<div></div>")
  }
  //添加一个蛇身体移动的方法
  moveBody() { 
    //将后面的身体设置为前边身体的位置
    for (let i = this.bodies.length - 1; i > 0; i--) { 
      //获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      //将值设置到当前身体
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }
  //检查蛇头是否撞到身体
  cheakHeadBody() { 
    //获取所有的身体，检查是否和蛇头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) { 
        //进入判断说明蛇头撞到身体
        throw new Error('撞到自己了')
      }
    }
  }
} 

export default  Snake ;