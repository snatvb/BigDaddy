/**
 * Created by snatvb on 09.06.16.
 */

import {GameSize, Engine} from '../interfaces';
import {TextureTool} from '../texture';

/**
 * Базовый объект для всех последующих объектов в игровом мире
 */
export class BaseObject {
    private texture;
    private size;
    private textureImage;
    private engine;

    /**
     * Передаем текстуру и размеры объекта
     * @param engine
     * @param texture
     * @param size
     */
    constructor(engine, size, texture:TextureTool) {
        this.engine = engine;
        this.texture = texture;
        this.textureImage = texture.getImage();
        this.size = size;
    }
    public update(screen:CanvasRenderingContext2D, gameSize:GameSize, engine:Engine):void {
        this.__update(screen, gameSize, engine);
    }

    private __update(screen:CanvasRenderingContext2D, gameSize:GameSize, engine:Engine):void {
        this.draw(screen);
    }

    public draw(screen) {
        if(!this.texture.loaded) return;
        screen.drawImage(this.textureImage, 0, 0, this.size.width, this.size.height);
        //screen.beginPath();
        //screen.moveTo(30,96);
        //screen.lineTo(70,66);
        //screen.lineTo(103,76);
        //screen.lineTo(170,15);
        //screen.stroke();
    }
}