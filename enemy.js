class Bullet{
    ctx;
    x;
    y;
    angle;

    width;
    height;
    speed;
    color;
    isAboutToDieFlag;

    constructor(context, x, y, angle){
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.isAboutToDieFlag = false;
    }

    do(){
        this.x += this.speed * Math.cos(this.moveAngle);
        this.y += this.speed * (-Math.sin(this.moveAngle));
        

        this.draw();
        this.isAboutToDie = this.isOutOfCanvas();
    }

    isOutOfCanvas(){
        if(this.x > this.ctx.canvas.clientWidth || 
            this.x < 0 ||
            this.y > this.ctx.canvas.clientHeight ||
            this.y < 0){
                return true;
            }
        return false;
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x + (this.width / 2), this.y + (this.width / 2), this.width, 2 * Math.PI, false);
        ctx.fillStyle = 'yellow'
        ctx.fill()
    }
}

class PlayerBullet extends Bullet{
    constructor(context, x, y, angle){
        super(context, x, y, angle);

        this.speed = 5;
        this.height = 10;
        this.width = 10;
        this.color = 'yellow'
    }
}

class EnemyBullet extends Bullet{
    constructor(context, x, y, angle){
        super(context, x, y, angle);
        
        this.speed = 4;
        this.width = 10;
        this.height = 10;
        this.color = "orange"
    }
}


class Entity {

    position
    speed
    radius
    fillColor
    isReadyToShoot
    shootDelayMs
    controller
    bullets

    constructor(controller){
        this.controller = controller;
    }

    draw(){    
        
        this.controller.ctx.beginPath();
        this.controller.ctx.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, false);
        this.controller.ctx.fillStyle = this.fillColor;
        this.controller.ctx.fill();
        this.controller.ctx.lineWidth = 3;
        this.controller.ctx.strokeStyle = '#000000';
        this.controller.ctx.stroke();

        console.log(this.controller.ctx.fillStyle)
    }

    processBullets(){
        {
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

}

class Player extends Entity{
    constructor(
        position,
        speed,
        radius,
        fillColor,
        movementController
    ){
        super(movementController);
        this.position = position;
        this.speed = speed;
        this.radius = radius;
        this.fillColor = fillColor;

        this.bullets = [];
        this.isReadyToShoot = true;
        this.shootDelayMs = 100; 
    }

    shoot(){
        const deltaX = this.position.x - this.controller.mouse.position.x;
        const deltaY = this.position.y - this.controller.mouse.position.y;
        const rotation = (Math.atan2(deltaY, deltaX)) * 180 / Math.PI
        const radians = (2 * Math.PI / 360) * (rotation - 180) * -1;
        

        let bullet = new PlayerBullet(this.controller.ctx,
            // fix
            this.position.x - (10 / 2),
            this.position.y - (10 / 2),
            radians
        );
        
        this.bullets.push(bullet);

        //let bullet = new Bullet(ctx, this.position.x - (this.bulletWidth / 2), this.position.y - (this.bulletHeight / 2), this.bulletWidth, this.bulletheight, radians, this.bulletSpeed)
        //this.bullets.push(bullet);
    }

    act(){
        this.controller.act(this);
    }

    processBullets(){
        this.controller.processBullets(this.bullets)
    }


}

class Enemy extends Entity{
    constructor(){

    }
}



class MovementController{

    // isMoving
    // isRunning
    // up
    // down
    // left
    // right
    // degrees
    // entity

    // mouse

    constructor(ctx){
        this.ctx = ctx;

        this.isMoving = false;
        this.isRunning = false;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.degress = 0;
        this.entity = undefined
        
        this.mouse = {
            left: false,
            right: false,
            position: {x: 0, y: 0}
        }            
    }


    setEntity(entity){
        this.entity = entity
    }

    setMousePosition(event, canvas){
        const rect = canvas.getBoundingClientRect();
        this.mouse.position.x = event.clientX - rect.left;
        this.mouse.position.y = event.clientY - rect.right;
    }
    setMousePosition(canvas, pageX, pageY){
        const rect = canvas.getBoundingClientRect();
        this.mouse.position.x = pageX - rect.left;
        this.mouse.position.y = pageY - rect.right;
    }

    handleKey(event){
        const type = event.type;
        const key = event.code;
        const action = keyCodes[key];
    
        if(action){
            if(action.startsWith('move')){
                this.isMoving = (type === 'keydown');
                switch(action){
                            case 'move_left': {
                                this.left = this.isMoving
                            } break;
                            case 'move_right': {
                                this.right = this.isMoving
                            } break;
                            case 'move_up': {
                                this.up = this.isMoving
                            } break;
                            case 'move_down': {
                                this.down = this.isMoving
                            } break;
                        default: console.log(`action ${action} is not specified`)
                }
            }
        }
    }


    processBullets(bullets){
        {
            for(let bullet of bullets){
                bullet.do();
            }
            for(let i = bullets.length - 1; i >= 0; i--){
                if(bullets[i].isAboutToDie === true){
                    const index = bullets.indexOf(bullets[i]);
                    if(index > -1){
                        bullets.splice(index, 1); console.log('bullet dead');
                    }
                }
            }
        }
    }

    act(entity){
        if(this.up){
            entity.position.y -= this.isRunning === true ? ((entity.speed * 1.5) * secondsPassed) : (entity.speed * secondsPassed) 
        }
        if(this.down){
            entity.position.y += this.isRunning === true ? ((entity.speed * 1.5) * secondsPassed) : (entity.speed * secondsPassed) 
        }
        if(this.left){
            entity.position.x -= this.isRunning === true ? ((entity.speed * 1.5) * secondsPassed) : (entity.speed * secondsPassed);
        }
        if(this.right){
            entity.position.x += this.isRunning === true ? ((entity.speed * 1.5) * secondsPassed) : (entity.speed * secondsPassed);
        }

    }
}