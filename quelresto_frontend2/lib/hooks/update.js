// https://npmjs.org/package/execSync
// Executes shell commands synchronously

/*
var exec = require('child_process').exec;
var file, command;

var object = require('./data/update');
for (var i in object) {
    file = object[i].file;
    command = object[i].command;

    exec('Installer\\gitDiff.cmd ' + file + ' \"' + command + '\"', function (er, stout, err2) {
        console.log('---------------------------');
        console.log(er);
        console.log(stout);
        console.log(err2);

    });

}*/
// https://npmjs.org/package/execSync
// Executes shell commands synchronously
require('shelljs/global');

var file, command, fileChanged;

var object = require('../../hooks/data/update');
for (var i in object) {
    file = object[i].file;
    command = object[i].command;
    fileChanged = (exec('git diff HEAD@{1} --stat -- ' + file + ' | wc -l').output > 0);

    console.log(fileChanged);

    if (fileChanged) {
        console.log(file + ' has changed, dependencies will be updated.');
        exec(command);
    }
}
process.exit(0);