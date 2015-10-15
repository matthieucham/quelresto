#!/bin/sh
#git bisect run ./script/bisect.sh

#tested command
grunt build


# Check exit status.
# (status != 0) ?
status=$?
if [ $status -ne 0 ]
    then
        echo "Test failure, status $status."
        exit $status
fi


echo "Tests passed."