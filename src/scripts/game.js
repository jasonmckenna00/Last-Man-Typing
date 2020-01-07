import Alien from './aliens'


class Game {
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.alienArray = [];
        this.wordArray = [];
        this.spawnRate = 5000;
        this.delay = Math.floor(Math.random() * this.spawnRate);
        this.draw = this.draw.bind(this)


        setInterval(()=>{
            let alien = new Alien(this.ctx,this.canvas);
            this.alienArray.push(alien);
            this.wordArray.push(alien.word);
        },this.delay)

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