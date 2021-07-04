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


        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * (-Math.sin(this.angle));
        

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
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

class PlayerBullet extends Bullet{
    constructor(context, x, y, angle){
        super(context, x, y, angle);

        this.speed = 10;
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