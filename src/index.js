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


});