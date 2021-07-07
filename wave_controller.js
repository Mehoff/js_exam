class WaveController{
    
    waveNumber = 1;

    tryStartGame(){
        if(enemies.length == 0){
            ENEMIES_WAVE_COUNT += 3;
            alert(`Волна №${++this.waveNumber}!`)
            startGame();
        }
        else if(mainPlayer.hp < 0){
            ENEMIES_WAVE_COUNT = 2;
            this.waveNumber = 1;
            alert(`Вы проиграли :(\nВсего пройдено волн ${--this.waveNumber}`);
            startGame();
        }
    }


}