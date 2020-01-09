import { inherits } from 'util';
var img = new Image();
img.src = '../../dist/assets/spritesheet1.png';
// img.src = '../../dist/assets/pinkship.png';


var randomWords = require('random-words')



class Alien{
    constructor(ctx, canvas, dx){
        this.ctx = ctx;
        this.canvas = canvas;
        this.size = 30;
        this.AlienPos = 1;
        this.dx = dx;
        this.rndPos = Math.floor(Math.random() * 10) * 27 + 60;
        this.rendered = 1;
        this._index = 0;
        this.delay = 0;
        this.word = randomWords();
        this.frames = [0,232,2*232,3*232,4*232,5*232];
        this.currentFrame = 0;
    }

    

    draw(){
        var frame;
        const max = this.frames.length;

        frame = this.frames[this.currentFrame % max];

        this.ctx.fillStyle = '#FFFFFF';
        const scale = .20;
        const width = 232;
        const height = 385;
        const scaledW = scale * width;
        const scaledH = scale * height;

        this.ctx.drawImage(img, frame, 0, width, height,this.AlienPos, this.rndPos, scaledW, scaledH);

        this.ctx.font = '25px Roboto';
        this.ctx.shadowBlur = 4;
        this.ctx.fillText(this.word, 10 + this.AlienPos, this.rndPos - 2);
    }

    update(count){
        this.AlienPos += this.dx;
        if (this.AlienPos >= this.canvas.width){
            this.rendered = 0;
        } else {
            this._index += this.dx;
            this.currentFrame += 1;
            // this.
            this.draw();
        }
    }

    // help(){
    //     var frame;
    //     if(this.)
    // }

}

export default Alien;