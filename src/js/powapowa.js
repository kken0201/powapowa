'use strict';

export default class Powapowa {
  constructor(id) {
    this.initCanvas(id);
    this.settings = {
      // 個数
      quantity: 5,
      // 速さ
      speed: 10,
      // 加速力
      acceleration: 1.01,
      // 揺れ幅
      shaking: 10,
      // 最大サイズ
      size: 8,
      // 色
      color: '#fff'
    };
    this.start();
  }

  // canvas初期化メソッド
  initCanvas(id) {
    this.canvas = document.getElementById(id);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'rgb(255,0,255)';
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
  }

  // 泡追加メソッド
  initBubbles() {
    let x = Math.floor(Math.random() * window.innerWidth);
    let base_x = x;

    for (let i = 0; i <= this.settings.quantity; i++) {
      let x = Math.floor(Math.random() * this.canvas.width);
      let y = this.canvas.height;
      let speed = Math.floor(Math.random() * this.settings.speed) + 1;
      let size = Math.floor(Math.random() * this.settings.size);
      this.bubbles.push({x: x, y: y, speed: speed, size: size, base_x: base_x, isFloating: false});

    }
  }

  // canvasアップデートメソッド
  update() {
    this.canvas.width = this.canvas.width;

    for (let bubble of this.bubbles) {
      if (bubble.y <= bubble.size) {
        bubble.isFloating = true;
      }

      if (bubble.isFloating == false) {
        bubble.speed *= this.settings.acceleration;
        bubble.y -= bubble.speed;
      }

      this.draw(bubble);
    }
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    requestAnimationFrame(this.update.bind(this));
  }

  draw(bubble) {
    this.ctx.fillStyle = this.settings.color;
    this.ctx.globalCompositeOperation = 'lighter';
    this.ctx.beginPath();
    this.ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2, true);
    this.ctx.fill();
  }

  start() {
    let that = this;
    this.bubbles = [];
    setInterval(function(){
      that.initBubbles();
    },500);
    requestAnimationFrame(this.update.bind(this));
  }
}
