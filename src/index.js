import Alien from './scripts/aliens'
import Game from './scripts/game';


document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementsByTagName("canvas")[0];
    // canvas.width = Game.DIM_X;
    // canvas.height = Game.DIM_Y;
    canvas.width = 800;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");



    const game = new Game(canvas, ctx)
    game.draw();

    // var alienArray = [];
    // var wordArray = [];
    // var delay = Math.floor(Math.random() * 5000);

    // setInterval(()=>{
    //     let alien = new Alien(ctx,canvas);
    //     alienArray.push(alien);
    //     wordArray.push(alien.word);
    //     // console.log(wordArray)
    // },delay)
    
    
    

    // function draw(){
    //     requestAnimationFrame(draw)
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     for (let i = 0; i < alienArray.length; i++){
    //         if (alienArray[i].rendered){
    //             alienArray[i].update();
    //         } else {
    //             alienArray.splice(i,1);
    //             wordArray.splice(i,1);
    //         }
    //     }
    //     // alien.update();
    // }
    // // setInterval(draw,75);
    // draw()
});