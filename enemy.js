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
        isAboutToDieFlag = false;
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
    isReadyToShoot
    shootDelayMs
    bullets

}

class Player extends Entity{
    constructor(
        position,
        speed,
        radius,
        bulletTemplate
    ){
        super();
        this.position = position;
        this.speed = speed;
        this.radius = radius;
        
        this.bulletTemplate = bulletTemplate
        this.bullets = [];

        this.isReadyToShoot = true;
        this.shootDelayMs = 100;

        console.log();
    }

    shoot(context, targetX, targetY){
        const deltaX = this.position.x - targetX;
        const deltaY = this.position.y - targetY;
        const rotation = (Math.atan2(deltaY, deltaX)) * 180 / Math.PI
        const radians = (2 * Math.PI / 360) * (rotation - 180) * -1;
        

        let bullet = new PlayerBullet(context,
            this.position.x - (this.bulletTemplate.width / 2),
            this.position.y - (this.bulletTemplate.height / 2),
            radians
        );
        
        this.bullets.push(bullet);

        //let bullet = new Bullet(ctx, this.position.x - (this.bulletWidth / 2), this.position.y - (this.bulletHeight / 2), this.bulletWidth, this.bulletheight, radians, this.bulletSpeed)
        //this.bullets.push(bullet);
    }

    
}

class Enemy extends Entity{
    constructor(){

    }
}