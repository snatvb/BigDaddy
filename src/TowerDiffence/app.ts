/**
 * Created by snatvb on 09.06.16.
 */

import { BigDaddy } from '../BigDaddy/app';

export class TowerDiffence {
    private engine;

    constructor(areaID:string = 'game') {
        this.engine = new BigDaddy(areaID);
    }

    public getSizeGame():Object {
        return this.engine.getSizeArea();
    }
}