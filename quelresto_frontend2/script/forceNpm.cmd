rem call script/forceNpm.cmd
rmdir node_modules /S /Q
del npm-shrinkwrap.json /S /Q
npm i && npm cache clean && npm shrinkwrap
