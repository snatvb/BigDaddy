/**
 * Created by snatvb on 09.06.16.
 */

import { BigDaddy } from '../BigDaddy/app';
import { GameSize } from '../BigDaddy/core/interfaces';

export class TowerDefence {
    private engine;
    private dragElement;
    private paused:boolean = false;

    /**
     * Создаем игру
     * Передаем ID canvas поля
     * @param areaID
     */
    constructor(areaID:string = 'game') {
        this.engine = new BigDaddy(areaID, <Function>this.update, {width: 375, height: 667}); // Подключаем движок
        //this.engine.createObject({percent: 20}, 'img/tower.png');
        this.addListens();
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
        this.engine.setEarth('img/land.jpg');

        this.engine.start();

        var self = this;
        setTimeout(function () {
            self.pause();
        }, 2000);
    }

    /**
     * Обновление игры
     * @param sreen
     * @param gameSize
     */
    private update(sreen:CanvasRenderingContext2D, gameSize:GameSize):void {
        //console.log(sreen);
        //console.log(gameSize.x, gameSize.y);
    }

    /**
     * Приостанавливаем игру
     * @param pause
     */
    public pause(pause:boolean = true):void {
        this.engine.pause(pause);
        this.paused = pause;
    }

    private addListens():void {
        var self = this;

        document.addEventListener('touchstart', function(event:any) {
            if (this.dragElement || !event.target.getAttribute('draggable') || self.paused) {
                return;
            }
            var element = <HTMLElement>event.target.cloneNode();
            element.className += ' draggable';
            document.body.appendChild(element);
            this.dragElement = element;
        });

        document.addEventListener('touchmove', function(event:any) {
            if(!this.dragElement) return;
            event.preventDefault();
            this.dragElement.style.left = (event.targetTouches[0].pageX - this.dragElement.clientWidth / 2) + 'px';
            this.dragElement.style.top = (event.targetTouches[0].pageY - this.dragElement.clientHeight / 2) + 'px';
        }, false);

        document.addEventListener('touchend', function(event:any) {
            if(!this.dragElement) return;
            self.engine.createObject({percent: 20}, 'img/tower.png', {
                x:parseInt(this.dragElement.style.left, 10),
                y:parseInt(this.dragElement.style.top, 10)
            });
            this.dragElement.remove();
            this.dragElement = null;
        }, false);
    }
}
