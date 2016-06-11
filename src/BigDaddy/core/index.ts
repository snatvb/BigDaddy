/**
 * Created by snatvb on 09.06.16.
 */

import {GameSize} from './interfaces';
import {BaseObject} from './object/base';
import {TextureTool} from './texture';

export class Core {
    public engine;
    private BaseObject;
    private textureTool;

    /**
     * Создаем ядро
     * Передаем движок
     * @param engine
     */
    constructor(engine) {
        this.engine = engine;
        this.BaseObject = BaseObject;
        this.textureTool = TextureTool;
    }

    /**
     * Ставим землю
     * @param earth
     */
    public setEarth(earth:string):void {

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
        return new this.textureTool(texture);
    }
}