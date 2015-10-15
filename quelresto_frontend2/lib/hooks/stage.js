var execA = require('child_process').exec;
// https://npmjs.org/package/execSync
// Executes shell commands synchronously
require('shelljs/global');
var branchName = exec('git branch | grep \'*\' | sed \'s/* //\'').output;
console.log('branchName :' + branchName);

// Don't run on rebase
if (branchName !== '(no branch)') {
    execA('git diff --cached --quiet', function (err, stdout, stderr) {
        /*jshint unused: false*/
        'use strict';

        // only run if there are staged changes
        // i.e. what you would be committing if you ran "git commit" without "-a" option.
        // if (err) {
        // stash unstaged changes - only test what's being committed
        console.log('Stash starting');
        exec('git stash save --keep-index --quiet "PushBeforeTest"');
        console.log('Stash is complete');
        console.log('Run {{{task}}}');

        //Text Template (HTML Encoding disabled) 
        execA('{{{task}}}', {
            //https://github.com/gmarty/grunt-closure-compiler/pull/12
            //MaxBuffer Issue -> increase buffer
            maxBuffer: 2048 * 1024
        }, function (err, stdout, stderr) {
            console.log('Grunt is complete');
            var exitCode = 0;
            if (err) {
                if (stderr) {
                    console.log(stderr);
                } else {
                    console.log(err);
                }

                exitCode = -1;
            }

            var stashString = exec('git stash list | grep PushBeforeTest').output;

            var regExp = /(stash@\{)([0-9]+)(\}.*)/;
            var result = stashString.match(regExp);

            if (result) {
                try {
                    console.log('Detected Stash : ' + stashString);
                    stashString = parseInt(result[2],10);
                    if (!isNaN(stashString)) {
                        console.log('Restore stashed changes : stash@{' + stashString + '}');
                        exec('git stash pop --quiet');
                        //console.log('Remove stash@{' + stashString + '}');
                        //exec('git stash drop --quiet stash@{' + stashString + '}');
                    }

                } catch (error) {
                    console.err(error.message);
                }
            }

            process.exit(exitCode);
        });
        //  }
    });
}