/**
 * Created by snatvb on 09.06.16.
 */

import {Core} from './core/index';

export class BigDaddy {
    public area;
    public screen;
    private gameSize;
    public core;

    /**
     * Конструктор
     * @param areaID
     * @param fullSize
     */
    constructor(areaID:string = 'game', fullSize:boolean = true) {
        this.area = document.getElementById(areaID);
        this.screen = this.area.getContext("2d");
        if (fullSize) this.setSize();
        this.core = new Core(this);
    }

    /**
     * Получаем размеры области игры
     * @returns {any}
     */
    public getSizeArea():void {
        return this.gameSize;
    }

    /**
     * Устанавливаем фуллсткрин
     */
    private setSize():void {
        this.area.innerHeight = window.innerHeight;
        this.area.innerWidth = window.innerWidth;
        this.gameSize = {x: this.area.width, y: this.area.height};
    }
}