/***
    Internal Tools for Spying
*/



/**
 * Factory to spy method
 * @param {Object} obj
 * @param {String} method
 * @return {Object} SPy Object
 */
function factory(obj, method) {
    var spy;
    if (!jasmine.isSpy(obj[method])) {
        spy = spyOn(obj, method);
    } else {
        //return existed spy   
        spy = obj[method];
    }
    return spy;
}

module.exports = {
    factory: factory

};