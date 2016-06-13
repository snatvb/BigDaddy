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
    public setEarth(earth:string):any {
        var engine = this.engine;
        var drawEarth = (texture) => {
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
        };
        this.earth = this.getBaseTexture(earth,
            drawEarth);
        return drawEarth;
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
    public getTexture(texture:string):any {
        return new this.Texture(texture);
    }

    public isOnGrid(grid:any, x:number, y:number, width:any, height:any):boolean {
        for (var i = 0; i < grid.length; i++) {
            var gridItem = grid[i];
            this.engine.screen.fillStyle="#376f0a";
            //this.engine.screen.globalAlpha= 0.2;
            this.engine.screen.fillRect(gridItem[0].x, gridItem[0].y, gridItem[1].x - gridItem[0].x, gridItem[1].y - gridItem[0].y);
            if (x > gridItem[0].x && x < gridItem[1].x - width &&
                y > gridItem[0].y && y < gridItem[1].y - height
            ) {
                return true;
            }
        }
        return false;
    }
}