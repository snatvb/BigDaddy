/**
 * Created by snatvb on 09.06.16.
 */

import { BigDaddy } from '../BigDaddy/app';
import { GameSize } from '../BigDaddy/core/interfaces';

export class TowerDiffence {
    private engine;

    constructor(areaID:string = 'game') {
        this.engine = new BigDaddy(areaID, <any>this.update);
    }

    public getSizeGame():Object {
        return this.engine.getSizeArea();
    }
    public start():void {
        this.engine.start();
    }
    private update(sreen:CanvasRenderingContext2D, gameSize:GameSize):void {
        //console.log(sreen);
        console.log(gameSize.x, gameSize.y);
    }
}