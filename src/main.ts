/**
 * Демонстация движка
 */

import { BigDaddy } from './BigDaddy/app';
import { TowerDefence } from './TowerDiffence/app';

(function () {
    var td = new TowerDefence('game');
    td.start();
})();