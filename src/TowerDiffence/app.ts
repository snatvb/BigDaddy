/**
 * Created by snatvb on 09.06.16.
 */

// [[{"x":215,"y":10},{"x":372,"y":197}],[{"x":75,"y":83},{"x":162,"y":384}],[{"x":165,"y":246},{"x":371,"y":385}],[{"x":8,"y":438},{"x":302,"y":509}],[{"x":10,"y":515},{"x":112,"y":604}],[{"x":164,"y":560},{"x":371,"y":607}]]

import { BigDaddy } from '../BigDaddy/app';
import { GameSize } from '../BigDaddy/core/interfaces';
import { Grid } from './../BigDaddy/grid';
import { GridTool } from './../BigDaddy/gridTool';
import { Tower } from './objects';

export class TowerDefence {
    private engine;
    private dragElement;
    private paused:boolean = false;
    private gridTool;
    private grid;

    /**
     * Создаем игру
     * Передаем ID canvas поля
     * @param areaID
     */
    constructor(areaID:string = 'game') {
        this.engine = new BigDaddy(areaID, <Function>this.update, {width: 375, height: 667}); // Подключаем движок
        this.addListens();
        // Подключаем тулзу для создания сетки
        //this.gridTool = new GridTool((coords) => console.log(JSON.stringify(coords)));
        this.grid = JSON.parse(`[[{"x":215,"y":10},{"x":372,"y":197}],[{"x":75,"y":83},
        {"x":162,"y":384}],[{"x":165,"y":246},{"x":371,"y":385}],[{"x":8,"y":438},{"x":302,"y":509}],
        [{"x":10,"y":515},{"x":112,"y":604}],[{"x":164,"y":560},{"x":371,"y":607}]]`);
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
        this.engine.setEarth('img/maps/level_1.png');

        this.engine.start();

        var self = this;
        //setTimeout(function () {
        //    self.pause();
        //}, 2000);
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
            self.newObject(this.dragElement.getAttribute('objectName'),
                parseInt(this.dragElement.style.left, 10),
                parseInt(this.dragElement.style.top, 10)
            );
            this.dragElement.remove();
            this.dragElement = null;
        }, false);
    }

    private newObject(attribute:any, x:number, y:number) {
        //console.log(this.grid);
        var tower:any = new Tower(this.engine, x, y);
        if(!this.engine.core.isOnGrid(this.grid, x, y, tower.width, tower.height)) {
            return;
        }
        tower.spawn();
    }
}
