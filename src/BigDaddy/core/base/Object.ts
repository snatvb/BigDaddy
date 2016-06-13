/**
 * Created by snatvb on 09.06.16.
 */

import {GameSize, Engine, Position} from '../interfaces';
import {Texture} from '../texture';

/**
 * Базовый объект для всех последующих объектов в игровом мире
 */
export class BaseObject {
    private texture;
    private size:any;
    private textureImage;
    private engine;
    private zIndex:number = 1;
    private position:Position;
    private drawing:boolean;
    private alive:boolean;
    private velocity:number;
    private damage:number;
    private health:number;
    private name:any;

    /**
     * Передаем текстуру и размеры объекта
     * @param engine
     * @param texture
     * @param size
     * @param settings
     */
    constructor(engine, size, texture:Texture, settings:any = {}) {
        this.engine = engine;
        this.texture = texture;
        this.textureImage = texture.getImage();
        this.size = this.setSize(size);
        this.position = settings.position || {x: 0, y: 0};

        this.alive = typeof settings.alive === 'undefined';
        this.velocity = settings.velocity || 5;
        this.damage = settings.attak || 5;
        this.health = settings.health || 1;
        this.name = settings.name || null;
    }

    public update(screen:CanvasRenderingContext2D, gameSize:GameSize, engine:Engine):void {
        this.__update(screen, gameSize, engine);
    }

    private __update(screen:CanvasRenderingContext2D, gameSize:GameSize, engine:Engine):void {
        if (this.drawing) this.draw(screen);
    }

    /**
     * Отрисовываем
     * @param screen
     */
    public draw(screen) {
        if (!this.texture.loaded) return;
        this.textureImage.ZIndex = this.zIndex + 2;
        var originalSize = this.texture.getOriginSize();
        screen.drawImage(this.textureImage, 0, 0, originalSize.width, originalSize.height,
            this.position.x, this.position.y, this.size.width, this.size.height);
        //screen.beginPath();
        //screen.moveTo(303,963);
        //screen.lineTo(70,66);
        //screen.lineTo(103,76);
        //screen.lineTo(170,15);
        //screen.stroke();
    }

    private __module(num:number){
        return num > 0 ? num : num * -1;
    }

    /**
     * Получаем размеры в процентах
     * @param percent
     * @returns {webdriver.promise.Promise.<webdriver.ISize[]>|webdriver.promise.Promise.<webdriver.ISize>|{width, height}|*}
     */
    private getPercent(percent:number):any {
        var size = this.texture.getSize();
        size.width = (size.width / 100) * percent;
        size.height = (size.height / 100) * percent;
        return size;
    }

    /**
     * Устанавливаем размеры
     * @param size
     * @returns {any}
     */
    private setSize(size:any):any {
        if (size instanceof Array) {
            if (size.length < 2) {
                console.warn('Object: size array is less two');
                return {width: 0, height: 0};
            }
            return {width: size[0], height: size[1]}
        }
        if (size.percent) {
            return this.getPercent(size.percent);
        }
        return size;
    }

    /**
     * Устанавливаем zIndex
     * @param index
     */
    public setZIndex(index:number):void {
        this.zIndex = <number>index;
    }

    /**
     * Установить позицию
     * @param x
     * @param y
     * @returns {Position}
     */
    public setPosition(x:number, y:number):Position {
        this.position.x = x;
        this.position.y = y;
        return this.position;
    }

    /**
     * Спавним объект
     */
     public spawn():void {
         this.drawing = true;
     }

    /**
     * Получить размеры
     * @returns {any}
     */
    public getSize():any {
        return this.size;
    }
}