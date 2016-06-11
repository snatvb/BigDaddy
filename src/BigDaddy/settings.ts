/**
 * Created by snatvb on 09.06.16.
 */

export const setSettings = (s:any = {}):Object => {
    var settings = {
        width: s.width,
        height: s.height
    };
    return settings;
};