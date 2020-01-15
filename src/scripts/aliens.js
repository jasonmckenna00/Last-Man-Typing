import shipSprite from '../../src/assets/shipsprite.png';

var randomWords = require('random-words')



var img = new Image;
img.src = shipSprite;


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
        this.frameWidth = 100;
        // this.frames = [0,this.frameWidth,2*this.frameWidth,3*this.frameWidth,4*this.frameWidth,5*this.frameWidth];
        this.frames = [0, 100];
        this.currentFrame = 0;
        this.dy = 0
    }

    

    draw(){
        var frame;
        const max = this.frames.length;

        frame = this.frames[this.currentFrame % max];

 

        this.ctx.fillStyle = '#FFFFFF';
        const scale = 1;
        const width = 100;
        const height = 100;
        const scaledW = scale * width;
        const scaledH = scale * height;
        this.ctx.drawImage(img, frame, 0, width, height,this.AlienPos, this.rndPos + this.dy, scaledW, scaledH);


        this.ctx.font = '17px Frijole';
        this.ctx.shadowBlur = 4;
        this.ctx.fillText(this.word, 25 + this.AlienPos, this.rndPos + 15 + this.dy);
    }

    update(){
        this.AlienPos += this.dx;
        if (this.AlienPos >= this.canvas.width){
            this.rendered = 0;
        } else {
            this._index += this.dx;
            this.currentFrame += 1;
            // console.log(this.currentFrame)
            const rng = Math.floor(Math.random() * (4) + 1);
            if (rng === 1){
                this.dy += 1;
            } else if (rng ===2){
                this.dy -= 1;
            } else {
                this.dy += 0;
            }
            
            
            this.draw();
        }
    }

    // loadAlien(frame,width,height,scaledW,scaledH){
    //     var img = new Image();
    //     img.onload = this.ctx.drawImage(img, frame, 0, width, height,this.AlienPos, this.rndPos, scaledW, scaledH);
    //     img.src = '../../dist/assets/2frameship.png';


    // }

}

export default Alien;