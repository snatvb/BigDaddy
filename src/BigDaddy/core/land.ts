/**
 * Created by snatvb on 13.06.16.
 */

import {ImageTool} from './image';

export class Earth {
    private engine:any;
    private src:string;
    private ImageTool:any;
    private img;
    private offset;
    private loaded:boolean;

    constructor(engine:any, src:string) {
        this.engine = <any>engine;
        this.src = <string>src;
        this.ImageTool = new ImageTool(engine.gameSize);
        this.engine.core.getBaseTexture(src, (texture) => {
            this.setParams(texture);
        });
    }

    public draw():void {
        this.engine.screen.drawImage(this.img, this.offset.x, this.offset.y, this.img.width, this.img.height);
    }

    public update() {
        if(!this.loaded) return;
        this.draw();
    }

    /**
     * Устанавливаем параметры
     * @param texture
     */
    private setParams(texture:any):void {
        this.img = this.ImageTool.setMaxSizeTexture(texture);
        this.offset = {x: 0, y: 0};
        this.img.ZIndex = 0;
        if (this.engine.gameSize.x < this.img.width) {
            this.offset.x = (this.engine.gameSize.x - this.img.width) / 2;
        }
        if (this.engine.gameSize.y < this.img.height) {
            this.offset.y = (this.engine.gameSize.y - this.img.height) / 2;
        }
        this.loaded = true;
    }
}