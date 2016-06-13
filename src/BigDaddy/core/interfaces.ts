/**
 * Created by snatvb on 09.06.16.
 */


export interface GameSize {
    x:number,
    y:number
}

export interface ObjectSize {
    width: number,
    height: number
}

export interface Position {
    x:number,
    y:number
}

export interface GameObject {
    position:Position,
    update:Function
}

//export interface Texture {
//    position: {
//        x: number,
//        y: number
//    }
//}

export interface Engine {
    createObject:Function
}