#env sh

npm start 2>&1 >server_output.log &
server_pid=$?

npm run-script integration-tests-internal

kill -9 $server_pid
