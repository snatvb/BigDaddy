/**
 * Created by snatvb on 11.06.16.
 */

import {BaseTexture} from './base/Texture';

export class Texture extends BaseTexture {

    /**
     * Создание текстуры
     * @param src
     * @param callback
     */
    constructor(src:string, callback:Function) {
        super(src, callback);
    }
}