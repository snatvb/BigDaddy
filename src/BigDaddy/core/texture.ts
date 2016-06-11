/**
 * Created by snatvb on 11.06.16.
 */


export class TextureTool {
    private _img;
    public loaded:boolean = false;

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
            if(typeof callback === 'function') callback(this);
        }
    }

    /**
     * Отдать image
     * @returns {any}
     */
    public getImage():any{
        return this._img;
    }
}