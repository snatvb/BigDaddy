/**
 * Created by snatvb on 12.06.16.
 */

import {Position} from '../BigDaddy/core/interfaces';

export class Tower {
    private positon:Position;
    private engine:any;
    private object:any;
    private width:number;
    private height:number;

    /**
     * Создем объект Tower
     * @param engine
     * @param x
     * @param y
     */
    constructor(engine:any, x:number = -1000, y:number = -1000) {
        if (!engine) console.warn('Tower: Engine is not defined!');
        this.engine = engine;
        this.positon = <Position>{x: x, y: y};
        //this.spawn();
        this.object = <any>this.engine.createObject({percent: 17}, 'img/tower.png', this.positon);
        var size:any = <any>this.object.getSize();
        this.width = <number>size.width;
        this.height = <number>size.height;
    }

    /**
     * Спавним объект
     */
    public spawn():void {
        this.object.spawn();
    }

    public getSize():any {
        return <any>this.object.getSize();
    }
}