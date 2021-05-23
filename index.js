let canvas = document.getElementById('main')
let ctx = canvas.getContext('2d')

let FPS = 0;
let secondsPassed = 0;
let oldTimeStamp = 0;

const keyCodes = {
    'KeyW' : 'move_up',
    'KeyS' : 'move_down',
    'KeyA' : 'move_left',
    'KeyD' : 'move_right',
    'KeyEnter' : 'enter',
}


let PLAYER = {
    position: {
        x : 100,
        y : 100
    },
    speed: 50,
    radius: 50,
    color: '#ffb6c1',
    stroke: 'black',

    isReadyToShoot: true,
    shootDelayMs: 100,

    bullets: [],

    shoot(){

        let bullet = new Bullet(ctx, this.position.x, this.position.y, 180, 10)
        this.bullets.push(bullet);
    },

    processBullets(){
        for(let bullet of this.bullets){
            bullet.do();
        }
        for(let i = this.bullets.length - 1; i >= 0; i--){
            if(this.bullets[i].isAboutToDie === true){
                const index = this.bullets.indexOf(this.bullets[i]);
                if(index > -1){
                    this.bullets.splice(index, 1)
                    console.log('bullet dead')
                }
            }
        }
    }
}

let CONTROLLER = {

    isMoving: false,
    up: false,
    down: false,
    left: false,
    right: false,

    mouse: {
        left : false,
        right : false,
        position: {
            x : 0,
            y : 0
        }
    },

    degrees : 0,

    act(){
        if(this.up){
            PLAYER.position.y -= (PLAYER.speed * secondsPassed);
        }
        if(this.down){
            PLAYER.position.y += (PLAYER.speed * secondsPassed)
        }
        if(this.left){
            PLAYER.position.x -= (PLAYER.speed * secondsPassed);
        }
        if(this.right){
            PLAYER.position.x += (PLAYER.speed * secondsPassed);
        }

        PLAYER.processBullets()
    },
    setMousePosition(x, y){
        this.mouse.position.x = x;
        this.mouse.position.y = y
    }
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

    // ctx.fillStyle = 'red'
    // ctx.fillRect(PLAYER.position.x, PLAYER.position.y, 10, 10)


    

    //let m = (PLAYER.position.y - CONTROLLER.mouse.position.y) / (PLAYER.position.x - CONTROLLER.mouse.position.y);
    //console.log((Math.atan2(m)) * (180 / Math.PI));

}

function gameLoop(timestamp){

    secondsPassed = (timestamp - oldTimeStamp) / 1000;
    secondsPassed = Math.min(secondsPassed, 0.1);
    oldTimeStamp = timestamp;

    clearCanvas();
    drawCall();
    CONTROLLER.act();
    drawFPS();

    // SPOT FOR DEBUGGING
    // ========
    
    // ========

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

    ctx.beginPath();
    ctx.moveTo(PLAYER.position.x, PLAYER.position.y);
    ctx.lineTo(CONTROLLER.mouse.position.x, CONTROLLER.mouse.position.y)
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red'
    ctx.stroke();

}

function clearCanvas(){
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function onMousePress(event){
    
    event.preventDefault();
    
    if(event.target.id === 'main'){
        switch(event.button){
        
        //LEFT MOUSE CLICK
        case 0: {
            PLAYER.shoot();
        }
            break;
        case 1: console.log(`Right: X: ${event.clientX}| Y: ${event.clientY}`)
            break;
    }

    }
}


function HandleKey(event){

    const type = event.type;
    const key = event.code;
    const action = keyCodes[key];

    if(action){
        if(action.startsWith('move')){
            CONTROLLER.isMoving = (type === 'keydown');
            switch(action){
                        case 'move_left': {
                            CONTROLLER.left = CONTROLLER.isMoving
                        } break;
                        case 'move_right': {
                            CONTROLLER.right = CONTROLLER.isMoving
                        } break;
                        case 'move_up': {
                            CONTROLLER.up = CONTROLLER.isMoving
                        } break;
                        case 'move_down': {
                            CONTROLLER.down = CONTROLLER.isMoving
                        } break;
                        default: console.log(`action ${action} is not specified`)
                    }
        }
    }
}

function HandleMouseMove(event){
    if(event.target.id === 'main'){
        CONTROLLER.setMousePosition(event.pageX, event.pageY)
    }
}

document.addEventListener('keyup', HandleKey)
document.addEventListener('keydown', HandleKey)
document.addEventListener('mousedown', (event) => onMousePress(event))
document.addEventListener('mousemove', HandleMouseMove);

window.requestAnimationFrame(gameLoop)