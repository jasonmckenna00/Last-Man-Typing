var randomWords = require('random-words')


class Alien{
    constructor(ctx, canvas, dx){
        this.ctx = ctx;
        this.canvas = canvas;
        this.size = 30;
        this.AlienPos = 1;
        this.dx = dx;
        this.rndPos = Math.floor(Math.random() * 10) * 27 + 30;
        this.rendered = 1;
        this.word = randomWords();
        
    }
    

    draw(){
        this.ctx.beginPath();
        this.ctx.rect(0 + this.AlienPos,this.rndPos,this.size/2,this.size);
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.font = '15px Verdana';
        this.ctx.shadowBlur = 4;
        this.ctx.fillText(this.word, 0 + this.AlienPos, this.rndPos - 5);
    }

    update(){
        this.AlienPos += this.dx;
        if (this.AlienPos >= this.canvas.width){
            this.rendered = 0;
        } else {
            this.draw();
        }
    }


}

export default Alien;