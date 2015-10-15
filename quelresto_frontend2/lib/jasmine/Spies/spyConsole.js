var exp = require('@spyUtils').expectSpyCalled;
var fact = require('@spyCommon.js').factory;

/**
 * Enregistre un espion Jasmine sur la méthode console.log.
 */
function spyConsoleLog() {
    fact(console, 'log');
}

/**
 * Enregistre un espion Jasmine sur la méthode console.error.
 */
function spyConsoleError() {
    fact(console, 'error');
}

/**
 * Enregistre un espion Jasmine sur les deux méthodes console.error et console.log.
 */
function spyConsole() {
    spyConsoleLog();
    spyConsoleError();
}


/**
 * Vérifie que des logs aient été loggués sur la console du browser par une invocation de console.log. La méthode attend autant d'arguments
 * que de logs à vérifier. Si invoquée sans argument, vérifie juste que le console.log a été invoqué, indépendamment du nombre d'invocations
 * et des paramètres.
 */
function expectLogs() {
    exp(console.log, arguments);
}

/**
 * Vérifie que des erreurs aient été loggués sur la console du browser par une invocation de console.error. La méthode attend autant
 * d'arguments que de logs à vérifier. Si invoquée sans argument, vérifie juste que le console.error a été invoqué, indépendamment du nombre
 * d'invocations et des paramètres.
 */
function expectErrors() {
    exp(console.error, arguments);
}

/**
 * Vérifie qu'aucun message de log n'ait été loggué sur la console du browser par une invocation de console.log.
 */
function expectNoLog() {
    expect(console.log).not.toHaveBeenCalled();
}

/**
 * Vérifie qu'aucun message d'erreur n'ait été loggué sur la console du browser par une invocation de console.error.
 */
function expectNoError() {
    expect(console.error).not.toHaveBeenCalled();
}


module.exports = {
    log: spyConsoleLog,
    error: spyConsoleError,
    spyConsole: spyConsole,
    expectLogs: expectLogs,
    expectErrors: expectErrors,
    expectNoLog: expectNoLog,
    expectNoError: expectNoError
};