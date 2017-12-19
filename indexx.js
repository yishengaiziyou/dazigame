$(function(){
    let code = new Code();
    let start1 = $('.start1')[0];
    start1.addEventListener('click', function () {
        code.start();
    })
    let gameover = $('.gameover')[0];
    gameover.addEventListener('click', function () {
        code.gameover();
    })
});