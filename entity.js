class Entity {

    position
    speed
    radius
    fillColor
    isReadyToShoot
    shootDelayMs
    controller
    bullets
    maxhp
    hp
    dieFlag

    constructor(controller){
        this.controller = controller;
        this.dieFlag = false;
    }

    draw(){    
        
        // Draw Player
        this.controller.ctx.beginPath();
        this.controller.ctx.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, false);
        this.controller.ctx.fillStyle = this.fillColor;
        this.controller.ctx.fill();
        this.controller.ctx.lineWidth = 3;
        this.controller.ctx.strokeStyle = '#000000';
        this.controller.ctx.stroke();

        // Also draw bullets

        if(this.bullets.length > 0){
            this.processBullets();
        }
    }

    processBullets(){
        {

            
            for(let bullet of this.bullets){
                bullet.do();
            }
            // for(let i = this.bullets.length - 1; i >= 0; i--){
            //     this.bullets[i].do();
            //     if(this.bullets[i].dying === true){
            //         const index = this.bullets.indexOf(this.bullets[i]);
            //         if(index > -1){
            //             this.bullets.splice(index, 1)
            //             console.log(this.bullets.length);
            //         }
            //     }
            // }
        }
    }

    takeDamage(bullet){
        this.hp -= bullet.damage
        this.checkDeath();
    }

    checkDeath(){
        if(this.hp <= 0){
            this.die();
        }
    }

    die(){
        this.dieFlag = true;
    }

    checkCollision(bullet){
        // if((this.position.x / 10).toFixed(0) === (bullet.position.x / 10).toFixed(0) && (this.position.y / 10).toFixed(0) === (bullet.position.y / 10).toFixed(0))
        // {
        //     //console.log(bullet)
        //     // console.log('collision')
        //     // bullet.dying = true;


        //     const index = bullet.author.bullets.indexOf(bullet)
        //     if(index > -1){
        //         bullet.author.bullets.splice(index, 1);
        //     }
        // }

        // if
        // (
        //     Math.abs(bullet.position.x - this.position.x) > (bullet.width + this.radius) &&
        //     Math.abs(bullet.position.y - this.position.y) > (bullet.width + this.radius)
        // )
        // {
        //     console.log("COLLISION")
        // }


        const dx = bullet.position.x - this.position.x;
        const dy = bullet.position.y - this.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if(dist < (bullet.width / 2) + this.radius){
            this.takeDamage(bullet);
            const index = bullet.author.bullets.indexOf(bullet);
            bullet.author.bullets.splice(index, 1);
        }

    }
}