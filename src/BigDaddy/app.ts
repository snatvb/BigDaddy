/**
 * Created by snatvb on 09.06.16.
 */

import {Core} from './core/index';
import {GameSize} from './core/interfaces';
import {setSettings} from './settings';

export class BigDaddy {
    public area;
    public screen:CanvasRenderingContext2D;
    private gameSize:GameSize;
    public core:Core;
    private update:Function;
    private settings:Object;

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
        this.core = new Core(this);
        this.update = updateCallBack;
        this.gameSize = this.setSize();
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
        this.area.innerHeight = window.innerHeight;
        this.area.innerWidth = window.innerWidth;
        return {x: this.area.width, y: this.area.height};
    }

    public start():void {
        if (typeof this.update !== 'function') {
            return console.warn('Game not starting. You not defined function');
        }

        var self = this;
        var tick = function () {
            self.update(self.screen, self.gameSize);
            requestAnimationFrame(tick);
        };

        tick();
    }
}