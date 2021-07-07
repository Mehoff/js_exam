class Bullet{
    ctx;
    position;
    angle;

    width;
    height;
    speed;
    color;
    damage;
    dying;

    author;

    constructor(context, position, angle, author){
        this.ctx = context;
        this.position = position;
        this.angle = angle;
        this.dying = false;
        this.author = author;
    }

    do(){
        this.position.x += this.speed * Math.cos(this.angle);
        this.position.y += this.speed * (-Math.sin(this.angle));
        
        // move this shit to another method
        if(this.isOutOfCanvas()){
            const index = this.author.bullets.indexOf(this);
            if(index > -1)
                this.author.bullets.splice(index, 1);
        }

        this.draw();
    }

    isOutOfCanvas(){
        if(this.position.x > this.ctx.canvas.clientWidth || 
            this.position.x < 0 ||
            this.position.y > this.ctx.canvas.clientHeight ||
            this.position.y < 0){
                return true;
            }
        return false;
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.position.x + (this.width / 2), this.position.y + (this.width / 2), this.width, 2 * Math.PI, false);
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

class PlayerBullet extends Bullet{
    constructor(context, position, angle, author){
        super(context, position, angle, author);

        this.speed = 10;
        this.height = 10;
        this.width = 10;
        this.damage = 10;
        this.color = 'yellow'
    }
}

class EnemyBullet extends Bullet{
    constructor(context, position, angle, author){
        super(context, position, angle, author);
        
        this.damage = 5;
        this.speed = 4;
        this.width = 10;
        this.height = 10;
        this.color = "orange"
    }
}