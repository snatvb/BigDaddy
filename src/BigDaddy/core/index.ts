/**
 * Created by snatvb on 09.06.16.
 */

import {GameSize} from './interfaces';
import {Texture} from './texture';
import {ImageTool} from './image';

import {BaseObject} from './base/Object';
import {BaseTexture} from './base/Texture';

export class Core {
    public engine;
    public BaseObject;
    public Texture;
    public ImageTool;
    public earth;

    /**
     * Создаем ядро
     * Передаем движок
     * @param engine
     */
    constructor(engine) {
        this.engine = engine;
        this.BaseObject = BaseObject;
        this.Texture = Texture;
        this.ImageTool = new ImageTool(this.engine.gameSize);
    }

    /**
     * Ставим землю
     * @param earth
     */
    public setEarth(earth:string):void {
        var engine = this.engine;
        this.earth = this.getBaseTexture(earth,
            (texture) => {
                var img = this.ImageTool.setMaxSizeTexture(texture),
                    offset = {x: 0, y: 0};
                img.ZIndex = 0;
                if (engine.gameSize.x < img.width) {
                    offset.x = (engine.gameSize.x - img.width) / 2;
                }
                if (engine.gameSize.y < img.height) {
                    offset.y = (engine.gameSize.y - img.height) / 2;
                }
                engine.screen.drawImage(img, offset.x, offset.y, img.width, img.height);
            });
    }


    public getBaseTexture(src:string, callback:Function = undefined):any {
        return new BaseTexture(src, callback);
    }

    /**
     * Наследуем объект
     * @param subject
     * @returns {any}
     */
    public extendObject(subject) {
        subject.prototype = Object.create(this.BaseObject.prototype);
        subject.prototype.constructor = subject;
        return subject;
    }

    /**
     * Получаем базовый объект
     * @returns {any}
     */
    public getBaseObject():any {
        return this.BaseObject;
    }

    /**
     * Получить текстуру
     * @param texture
     * @returns {any}
     */
    getTexture(texture:string):any {
        return new this.Texture(texture);
    }
}