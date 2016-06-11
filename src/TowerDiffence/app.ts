/**
 * Created by snatvb on 09.06.16.
 */

import { BigDaddy } from '../BigDaddy/app';
import { GameSize } from '../BigDaddy/core/interfaces';

export class TowerDiffence {
    private engine;

    /**
     * Создаем игру
     * Передаем ID canvas поля
     * @param areaID
     */
    constructor(areaID:string = 'game') {
        this.engine = new BigDaddy(areaID, <any>this.update); // Подключаем движок
        this.engine.createObject({width: 50, height: 100}, 'img/tower.png');
    }

    /**
     * Получить размеры игры
     * @returns {GameSize}
     */
    public getSizeGame():Object {
        return this.engine.getSizeArea();
    }

    /**
     * Запуск игры
     */
    public start():void {
        this.engine.setEarth('');

        this.engine.start();

        var self = this;
        setTimeout(function () {
            self.engine.pause();
        }, 1000);
    }
    private update(sreen:CanvasRenderingContext2D, gameSize:GameSize):void {
        //console.log(sreen);
        console.log(gameSize.x, gameSize.y);
    }

    /**
     * Приостанавливаем игру
     * @param pause
     */
    public pause(pause:boolean):void {
        this.engine.pause(pause);
    }
}