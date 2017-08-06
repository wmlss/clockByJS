var box = document.getElementById("clock");
// box.width = 200;
// box.height = 200;
var clock = box.getContext("2d");
var width = clock.canvas.width;
var height = clock.canvas.height;
var r = width / 2;
var rem = r / 10;
//讲半径分为10分

clock.translate(r, r);
//在函数内部重置（0, 0）点则每个函数都需要重置一次，函数外重置一次即可
draw();
setInterval(draw, 1000);
function draw() {
  clock.clearRect(-r, -r, width, height);
  //clearRect(x,y,width,height); 清空给定矩形内的指定像素。(x,y) 为清楚区域的左上角
  var time = new Date();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  drawRound();
  drawHour(hour, minute);
  drawMinute(minute);
  drawSecond(second);
  drawDot();
  clock.restore();
  //restore() 方法从栈中弹出存储的图形状态并恢复 CanvasRenderingContext2D
  //对象的属性、剪切路径和变换矩阵的值(即获取之前所做的)
}

function drawDot() {
  //画出中间白色原点，类似时钟中间的螺丝
  clock.save();
  clock.beginPath();
  clock.fillStyle = "#fff";
  clock.arc(0, 0, 3, 0, 2*Math.PI, false);
  clock.fill();
  clock.restore();
}

function drawRound() {
  clock.save();
  // save() 方法保存当前图像状态的一份拷贝。
  clock.beginPath();
  clock.lineWidth = 10;
  clock.arc(0, 0, r-5, 0, 2*Math.PI);
  //context.arc(x,y,r,sAngle,eAngle,counterclockwise);False = 顺时针，true = 逆时针。
  clock.stroke();

  var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  //因为画圆起点在3点钟方向
  for (let i in hourNumbers) {
    let angle = 2*Math.PI / 12 * i;
    let x = Math.cos(angle) * (r - 30);
    let y = Math.sin(angle) * (r - 30);
    clock.font = "24px bloder";
    clock.textAlign = "center";
    clock.textBaseline = "middle";
    clock.fillText(hourNumbers[i], x, y);
  }

  for (let i=0; i < 60; i++) {
    let rad = 2*Math.PI / 60 * i;
    let x = Math.cos(rad) * (r - 15);
    let y = Math.sin(rad) * (r - 15);
    clock.beginPath();
    // 起始一条路径，或重置当前路径
    if (i%5 === 0) {
      clock.fillStyle = "red";
      clock.arc(x, y, 3, 0, 2*Math.PI, false);
    }else {
      clock.fillStyle = "black";
      clock.arc(x, y, 2, 0, 2*Math.PI, false);
    }
    clock.fill();
  }
  clock.restore();
  // 恢复之前保存的
}

function drawHour(hour, minute) {
  // var rad = (2*Math.PI / 12) * (hour-3);
  // //弧度可以为负值范围为：-1 到 1.
  // var x = Math.cos(rad) * (r - 40);
  // var y = Math.sin(rad) * (r - 40);
  // console.log(y);
  // clock.save();
  // clock.beginPath();
  // clock.moveTo(0, 0);
  // clock.lineWidth = 6;
  // clock.lineCap = "round";
  // clock.lineTo(x, y);
  // clock.strokeStyle = "black";
  // clock.stroke();
  // clock.restore();
  // // 此方法为正常生成，但是不方便建造跨越中点的针,不推荐

  clock.save();
  clock.beginPath();
  var rad = 2 * Math.PI / 12 * (hour + minute / 60);
  clock.rotate(rad);
  clock.lineWidth = 8;
  clock.lineCap = "round";
  clock.moveTo(0, 10);
  clock.lineTo(0, -5.5 * rem);
  //此方向是一开始指向12点方向然后通过rotate()移动画布
  //来达到 移动到指定点数，故为-r 指向12点
  clock.stroke();
  clock.restore();
}

function drawMinute(minute) {
  var rad = 2 * Math.PI / 60 * minute;
  clock.save();
  clock.beginPath;
  clock.rotate(rad);
  clock.lineWidth = 5;
  clock.lineCap = "round";
  clock.moveTo(0, 15);
  clock.lineTo(0, -8*rem);
  clock.stroke();
  clock.restore();
}

function drawSecond(second) {
  var rad = 2 * Math.PI / 60 * second;
  clock.save();
  clock.beginPath();
  clock.rotate(rad);
  clock.linWidth = 2;
  clock.lineCap = "square";
  clock.strokeStyle = "red";
  clock.moveTo(0, 20);
  clock.lineTo(0, -9*rem);
  clock.stroke();
  clock.restore();
}
