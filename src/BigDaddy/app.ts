/**
 * Created by snatvb on 09.06.16.
 */

import {Core} from './core/index';
import {GameSize, Position} from './core/interfaces';
import {setSettings} from './settings';
import {Earth} from './core/land';

export class BigDaddy {
    public area;
    public screen:CanvasRenderingContext2D;
    public gameSize:GameSize;
    public core:Core;
    private update:Function;
    private settings:any;
    private _pause:boolean = false; // на паузе ли игра
    private tick;
    private _bodies:Array<any>;
    private BaseObject:any;
    private earth:any;

    /**
     * Конструктор
     * @param areaID
     * @param updateCallBack
     * @param settings
     */
    constructor(areaID:string = 'game', updateCallBack:Function = null, settings:Object = {}) {
        this.area = document.getElementById(areaID);
        this.screen = this.area.getContext("2d");
        this.settings = setSettings(settings);
        this.gameSize = this.setSize();

        this.core = new Core(this); // Подключаем ядро
        this.update = updateCallBack;
        this._bodies = [];
        this.BaseObject = this.core.getBaseObject();
    }

    /**
     * Получаем размеры области игры
     * @returns {GameSize}
     */
    public getSizeArea():GameSize {
        return this.gameSize;
    }

    /**
     * Устанавливаем фуллсткрин
     */
    private setSize():GameSize {
        var width, height;
        if (this.settings.width && this.settings.height) {
            width = this.settings.width;
            height = this.settings.height;
        } else {
            width = window.innerWidth;
            height = window.innerHeight;
        }
        this.area.height = parseInt(height, 10);
        this.area.width = parseInt(width, 10);
        return <GameSize>{x: width, y: height};
    }

    /**
     * Запуск движка(игры)
     * @returns {any}
     */
    public start():void {
        if (typeof this.update !== 'function') {
            return console.warn('Game not starting. You not defined function');
        }

        var self = this;
        this.tick = function () {
            if (self._pause) return;
            self._update(self.screen, self.gameSize);
            self.update(self.screen, self.gameSize);
            requestAnimationFrame(self.tick);
        };

        this.tick();
    }

    /**
     * Ставим игру на паузу
     * @param pause
     */
    public pause(pause:boolean = true):void {
        this._pause = pause;
        if(!pause) {
            this.tick();
        }
    }

    /**
     * Обновляем все объекты
     * @param screen
     * @param gameSize
     */
    private _update(screen:CanvasRenderingContext2D, gameSize:GameSize):void {

        this.screen.clearRect(0, 0, this.gameSize.x, this.gameSize.y);
        this.earth.update();
        for (var i = 0, max = this._bodies.length; i < max; i++) {
            var body = this._bodies[i];
            body.update(screen, gameSize, this);
        }
    }

    /**
     * Проверка на паузе ли игра
     * @returns {boolean}
     */
    public paused():boolean {
        return this._pause;
    }

    /**
     * Создать объект слитый с BaseObject
     * @param subject
     * @param size
     * @param texture
     */
    public createObjectExtend(subject, size, texture) {
        var extented = this.core.extendObject(subject);
        this._bodies.push(new extented(this, size, texture));
    }

    /**
     * Создаем простой объект из BaseObject
     * @param size
     * @param texture
     * @param position
     */
    public createObject(size, texture, position:Position = undefined, settings:any = {}):any {
        if(texture) {
            texture = this.core.getTexture(texture);
        }
        settings.position = position;
        var subject = new this.BaseObject(this, size, texture, settings);
        this._bodies.push(subject);
        return subject;
    }

    /**
     * Создать землю
     * @param src
     */
    public setEarth(src:string) {
        this.earth = new Earth(this, src);
    }

}