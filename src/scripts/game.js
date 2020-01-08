import Alien from './aliens'


class Game {
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.alienArray = [];
        this.wordArray = [];
        this.dx = .5;
        this.delay = Math.floor(Math.random() * 5000);
        this.draw = this.draw.bind(this)
        this.generateAliens = this.generateAliens.bind(this);
        this.createAlien = this.createAlien.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.generateAliens()
        
        setInterval( () => this.dx += .2,30000)
    }

    // changeSpeed(){
    //     this.dx += .2;
    // }


    createAlien(ctx,canvas,dx){
        let alien = new Alien(ctx,canvas,dx);
        this.alienArray.push(alien);
        this.wordArray.push(alien.word);
    };



    generateAliens(){
        let delay = Math.floor(Math.random() * 5000);

        setTimeout(()=>{
            this.createAlien(this.ctx,this.canvas, this.dx);
            this.generateAliens();
        },delay)
    }

    checkWord(word){
        // debugger
        let ele = this.wordArray.indexOf(word);
        console.log(this.alienArray.length)
        if (ele >= 0){
            // debugger
            this.alienArray.splice(ele,1);
            this.wordArray.splice(ele,1);
        }
    }


    draw(){
        requestAnimationFrame(this.draw)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.alienArray.length; i++){
            if (this.alienArray[i].rendered){
                this.alienArray[i].update();
            } 
            else {
                this.alienArray.splice(i,1);
                this.wordArray.splice(i,1);
            }
        }
    }
}


export default Game