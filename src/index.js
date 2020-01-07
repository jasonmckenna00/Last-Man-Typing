import Alien from './scripts/aliens'


document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementsByTagName("canvas")[0];
    // canvas.width = Game.DIM_X;
    // canvas.height = Game.DIM_Y;
    canvas.width = 800;
    canvas.height = 320;


    const ctx = canvas.getContext("2d");
    var randomWords = require('random-words')

    


    function Alien(){
        this.size = 30;
        this.AlienPos = 1;
        this.dx = .5;
        this.rndPos = Math.floor(Math.random() * 320);
        this.rendered = 1;
        this.word = randomWords();
        
        

        this.draw = function (){
            // debugger
            ctx.beginPath();
            ctx.rect(0 + this.AlienPos,this.rndPos,this.size/2,this.size);
            ctx.fillStyle = '#ff0000';
            ctx.fill();
            ctx.closePath();

            ctx.fillText(this.word, 0 + this.AlienPos, this.rndPos - 5)
            // console.log('asas')
        }

        this.update = function(){
            this.AlienPos += this.dx;
            if (this.AlienPos >= canvas.width){
                // console.log(alienArray.length)
                this.rendered = 0;
            } else {
                this.draw();
            }
        }


    }

    var alienArray = [];
    var wordArray = [];
    var delay = Math.floor(Math.random() * 5000);

    setInterval(()=>{
        let alien = new Alien();
        alienArray.push(alien);
        wordArray.push(alien.word);
        // console.log(wordArray)
    },delay)
    
    
    

function draw(){
    requestAnimationFrame(draw)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < alienArray.length; i++){
        if (alienArray[i].rendered){
            alienArray[i].update();
        } else {
            alienArray.splice(i,1);
            wordArray.splice(i,1);
        }
    }
    // alien.update();
}
// setInterval(draw,75);
draw()
});