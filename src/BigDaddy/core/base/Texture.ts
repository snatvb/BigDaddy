/**
 * Created by snatvb on 12.06.16.
 */


export class BaseTexture {
    private _img;
    public loaded:boolean = false;
    private originSize = {};

    /**
     * Создание текстуры
     * @param src
     * @param callback
     */
    constructor(src:string, callback:Function) {
        this._img = new Image;
        this._img.src = src;
        this._img.onload = () => {
            this.loaded = true;
            this.originSize = this.getSize();
            if (typeof callback === 'function') callback(this);
        }
    }

    /**
     * Отдать image
     * @returns {any}
     */
    public getImage():any {
        return this._img;
    }

    /**
     * Получить размеры изображения
     * @returns {{width: any, height: any}}
     */
    public getSize():any {
        return {
            width: this._img.width,
            height: this._img.height
        }
    }

    /**
     * Получить оригинальные размеры изображения
     * @returns {{}}
     */
    public getOriginSize():any {
        return this.originSize;
    }
}