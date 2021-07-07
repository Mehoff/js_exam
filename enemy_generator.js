class EnemyGenerator{
    constructor(ctx, player){
        this.ctx = ctx;
        this.player = player;
    }

    generateRandomEnemy(){

        let enemy = new Enemy(
            this.ctx,
            this.getRandomCanvasPosition(), 
            this.getRandomSpeed(), 
            20, 
            'red', 
            this.player, 
            this.getRandomHP(),
            this.getRandomShootDelayMs()
        );
        return enemy; 
    }

    getEnemiesArray(size){
        
        
        let array = [];
        
        for(let i = 0; i < size; i++){
            array.push(this.generateRandomEnemy());
        }
        return array;
    }

    getRandomCanvasPosition(){
        let x = 0 + Math.random() * (ctx.canvas.clientWidth + 1 - 0)
        let y = 0 + Math.random() * (ctx.canvas.clientHeight + 1 - 0)

        return {x, y};
    }

    getRandomSpeed(){
        return 0.3 + Math.random() * (1.5 + 1 - 0.3); 
    }

    getRandomHP(){
        return 50 + Math.random() * (200 + 1 - 50);
    }

    getRandomShootDelayMs(){
        return 500 + Math.random() * (1500 + 1 - 500);
    }

}