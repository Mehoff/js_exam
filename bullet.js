class Bullet{

    constructor(context, x, y, width, height, angle, speed){
        
        this.moveAngle = angle;
        this.ctx = context;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.width = width,
        this.height = height,
        this.isAboutToDie = false;
    }


    do(){
        this.x += this.speed * Math.cos(this.moveAngle);
        this.y += this.speed * (-Math.sin(this.moveAngle));
        

        this.draw();
        this.isAboutToDie = this.isOutOfCanvas();
        //also add collision later
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

        //ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}