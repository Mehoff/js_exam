let canvas = document.getElementById('main')
let ctx = canvas.getContext('2d')

let FPS = 0;
let secondsPassed = 0;
let oldTimeStamp = 0;


const keyCodes = {
    '119' : 'move_up',
    '115' : 'move_down',
    '97' : 'move_left',
    '100' : 'move_right',
    '13' : 'enter',
}

let PLAYER = {
    position: {
        x : 100,
        y : 100
    },
    speed: 50,
    radius: 50,
    color: '#ffb6c1',
    stroke: 'black'
}

let ENEMY = {
    position: {
        x : 0,
        y : 0
    },
    speed: 50,
    radius: 50,
    color: 'red',
    stroke: 'black'
}

const CENTER_X = ctx.width / 2;
const CENTER_Y = ctx.height / 2;

function drawBackground(){
    ctx.fillStyle = 'green'
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawPlayer(){
    ctx.beginPath();
    
    ctx.arc(PLAYER.position.x, PLAYER.position.y, PLAYER.radius, 2 * Math.PI, false);
    ctx.fillStyle = PLAYER.color;
    ctx.fill();
    
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

function gameLoop(timestamp){

    secondsPassed = (timestamp - oldTimeStamp) / 1000;
    secondsPassed = Math.min(secondsPassed, 0.1);
    oldTimeStamp = timestamp;

    clearCanvas();
    drawCall();
    drawFPS();

    window.requestAnimationFrame(gameLoop)
}

function drawFPS(){
    FPS = Math.round(1 / secondsPassed)
    ctx.font = '18px Verdana';
    ctx.fillStyle = 'white'
    ctx.fillText(`FPS: ${FPS}`, 20, 20)
}

function drawCall(){
    drawBackground();
    drawPlayer();
}

function clearCanvas(){
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function onKeyPress(event){
    event.preventDefault();
    handleAction(keyCodes[event.keyCode])
}

function onMousePress(event){
    
    event.preventDefault();
    
    if(event.target.id === 'main'){
        switch(event.button){
        
        case 0: console.log(`Left: X: ${event.clientX}| Y: ${event.clientY}`)
            break;
        case 1: console.log(`Right: X: ${event.clientX}| Y: ${event.clientY}`)
            break;
    }

    }
}

function handleAction(action){
    switch(action){
        case 'move_left': {
            PLAYER.position.x -= (PLAYER.speed * secondsPassed);
        } break;
        case 'move_right': {
            PLAYER.position.x += (PLAYER.speed * secondsPassed);
        } break;
        case 'move_up': {
            PLAYER.position.y -= (PLAYER.speed * secondsPassed);
        } break;
        case 'move_down': {
            PLAYER.position.y += (PLAYER.speed * secondsPassed)
        } break;
        default: console.log(`action ${action} is not specified`)
    }

    console.log(PLAYER.position)
}

document.addEventListener('keypress', (event) => onKeyPress(event))
document.addEventListener('mousedown', (event) => onMousePress(event))

window.requestAnimationFrame(gameLoop)