/**
 * Created by snatvb on 09.06.16.
 */

export const setSettings = (s:any = {}):Object => {
    var settings = {
        fullSize: typeof s.fullSize === 'undefined'
    };
    return settings;
};