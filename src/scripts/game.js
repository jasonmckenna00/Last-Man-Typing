import Alien from './aliens'


class Game {
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.alienArray = [];
        this.wordArray = [];
        this.delay = Math.floor(Math.random() * 5000);
        this.draw = this.draw.bind(this)
        this.generateAliens = this.generateAliens.bind(this);
        this.createAlien = this.createAlien.bind(this);
        this.generateAliens()
        

    }


        createAlien(ctx,canvas){
            let alien = new Alien(ctx,canvas);
            this.alienArray.push(alien);
            this.wordArray.push(alien.word);
        }



        generateAliens(){
            let delay = Math.floor(Math.random() * 5000);

            setTimeout(()=>{
                this.createAlien(this.ctx,this.canvas);
                this.generateAliens();
            },delay)
        }



    draw(){
        requestAnimationFrame(this.draw)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.alienArray.length; i++){
            if (this.alienArray[i].rendered){
                this.alienArray[i].update();
            } else {
                this.alienArray.splice(i,1);
                this.wordArray.splice(i,1);
            }
        }
    }
}


export default Game