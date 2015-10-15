//Private
function expectSpyCalled(spy, argumentsArray) {
    expect(spy).toHaveBeenCalled();

    var i;
    for (i = 0; i < argumentsArray.length; ++i) {
        expect(spy).toHaveBeenCalledWith(String(argumentsArray[i]));
    }
}

module.exports = {
    expectSpyCalled: expectSpyCalled
};
