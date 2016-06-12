/**
 * Created by snatvb on 12.06.16.
 */

import {GameSize} from './interfaces';

export class ImageTool {
    private gameSize:GameSize;

    constructor(gameSize:GameSize) {
        this.gameSize = gameSize;
    }

    /**
     * Устанавливаем максимальные размеры, сохраняя пропорции
     * @param texture
     */
    public setMaxSizeTexture(texture, center:boolean = true):any {
        var img = texture.getImage();
        var percent,
            width = img.width,
            height = img.height;

        if (width > height && width > this.gameSize.x){
            percent = this.getPercent(this.gameSize.y, height);
        } else {
            percent = this.getPercent(this.gameSize.x, width);
        }

        img.width = width + this.difference(this.gameSize.x, percent);
        img.height = height + this.difference(this.gameSize.y, percent);
        return img;
    }

    public difference(px:number, percent: number, round:boolean = true) {
        return round ? Math.ceil(px - (px / 100 * percent)) : px - (px / 100 * percent);
    }

    public getPercent(side:number, px:number):number {
        if (side > px) {
            return (Math.ceil((px * 100 / side)));
        }
        return Math.ceil((px * 100 / side));
    }
}