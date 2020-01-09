import { inherits } from 'util';
var img = new Image();
img.src = '../../dist/assets/spritesheet1.png';
// img.onload = function (){
//     init();
// }
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
        this._index = 0;
        this.delay = 0;
        this.word = randomWords();
        this.frames = [0,1,2,3,4,5];
        
    }

    
    init(){
        // if (frame === 9) frame = 6;
        const scale = .25;
        const width = 232;
        const height = 385;
        const scaledW = scale * width;
        const scaledH = scale * height;
        this.ctx.drawImage(img, 
                this.AlienPos, this.rndPos, 
                scaledW, scaledH,
                0,0,
                scaledW,scaledH)
    }

    draw(){
        var frame;
        const max = this.frames.length;
        const idx = Math.floor(this._index);
        frame = this.frames[idx % max];

        this.ctx.fillStyle = '#FFFFFF';
        const scale = .25;
        const width = 232;
        const height = 385;
        const scaledW = scale * width;
        const scaledH = scale * height;
        
        // this.ctx.drawImage(img, 
        //         this.AlienPos + (frame * scaledW), this.rndPos + (frame * scaledH), 
        //         scaledW, scaledH,
        //         0,0,
        //         scaledW,scaledH
        //         );
        this.ctx.drawImage(img, this.AlienPos, this.rndPos, scaledW, scaledH);

        this.ctx.font = '20px Verdana';
        this.ctx.shadowBlur = 4;
        this.ctx.fillText(this.word, 0 + this.AlienPos, this.rndPos - 5);
    }

    update(count){
        this.AlienPos += this.dx;
        if (this.AlienPos >= this.canvas.width){
            this.rendered = 0;
        } else {
            this._index += this.dx;
            // this.frameCount += 1;
            // this.frame = (this.frame + 1) % 6;
            this.draw();
        }
    }

    // help(){
    //     var frame;
    //     if(this.)
    // }

}

export default Alien;