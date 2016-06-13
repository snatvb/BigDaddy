/**
 * Created by snatvb on 12.06.16.
 */

import { Position } from './core/interfaces';

interface DataDiv {
    width:number,
    height: number,
    x: number,
    y: number
}

export class GridTool {
    private end:Function;
    private coords:any;
    private index;
    private rangeDiv:HTMLElement;
    private rangeDives;
    private startPosition:Position;

    constructor(callback:Function) {
        this.end = <Function>callback;
        this.coords = [];
        this.rangeDives = [];
        this.startPosition = <Position>{x: 0, y: 0};
        this.addListens();
    }


    private addListens():void {
        var self = this;

        document.addEventListener('touchstart', function (event:any) {
            self.rangeDiv = <HTMLElement>self.getRangeDiv();
            self.index = self.coords.length;
            self.coords[self.index] = [];
            self.startPosition = <Position>{x: event.targetTouches[0].pageX, y: event.targetTouches[0].pageY};
            self.coords[self.index][0] = self.startPosition;
            self.rangeDiv.style.top = self.startPosition.y + 'px';
            self.rangeDiv.style.left = self.startPosition.x + 'px';
            document.body.appendChild(self.rangeDiv);
        });

        document.addEventListener('touchmove', function (event:any) {
            event.preventDefault();
            let touchPos = {x: event.targetTouches[0].pageX, y: event.targetTouches[0].pageY};
            self.rangeDiv.style.width = touchPos.x - self.startPosition.x + 'px';
            self.rangeDiv.style.height = touchPos.y - self.startPosition.y + 'px';
        }, false);

        document.addEventListener('touchend', function (event:any) {
            var touchPos:Position = <Position>{x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY};
            self.coords[self.index][1] = touchPos;

            if ((self.coords[self.index][1].x === self.coords[self.index][0].x) &&
                self.coords[self.index][1].y === self.coords[self.index][0].y) {
                self.coords.splice(self.index, 1);
                self.rangeDiv.remove();
                self.removeInDives(<Position>touchPos);
                self.removeInRange(<Position>touchPos);
            } else {
                self.rangeDives.push(self.rangeDiv);
            }

            self.end(self.coords);
        }, false);
    }

    private getRangeDiv():HTMLElement {
        var div = document.createElement('div');
        div.style.background = 'rgba(37, 83, 10, .7)';
        div.style.position = 'absolute';
        div.style.zIndex = '4';
        return div;
    }

    /**
     * Удаляем лишнее
     * @param touchPos
     */
    removeInDives(touchPos:Position):void {
        var inTrash = [];
        for (var i = 0, max = this.rangeDives.length; i < max; i++) {
            var div = this.rangeDives[i];
            var dataDiv:DataDiv = <DataDiv> {
                width: parseInt(div.style.width, 10),
                height: parseInt(div.style.height, 10),
                x: parseInt(div.style.left, 10),
                y: parseInt(div.style.top, 10),
            };
            if(touchPos.x > dataDiv.x && touchPos.x < dataDiv.x + dataDiv.width &&
                touchPos.y > dataDiv.y && touchPos.y < dataDiv.y + dataDiv.height) inTrash.push(div);
        }
        for (var j = 0, maxTrash = inTrash.length; j < maxTrash; j++) {
            var indexDiv = this.rangeDives.indexOf(inTrash[j]);
            inTrash[j].remove();
            this.rangeDives.splice(indexDiv, 1);
        }
    }

    removeInRange(touchPos:Position):void {
        var inTrash = [];
        for (var i = 0, max = this.coords.length; i < max; i++) {
            var coord = this.coords[i];
            if(touchPos.x > coord[0].x && touchPos.x < coord[0].x + coord[1].x &&
                touchPos.y > coord[0].y && touchPos.y < coord[0].y + coord[1].y) inTrash.push(coord);
        }
        for (var j = 0, maxTrash = inTrash.length; j < maxTrash; j++) {
            var indexRange = this.coords.indexOf(inTrash[j]);
            this.coords.splice(indexRange, 1);
        }
    }
}