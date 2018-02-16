:PROMPT
SET /P AREYOUSURE=Are you sure spring boot jars will be deployed in production (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END
call gradlew  -Penv=dev deploy
call gradlew  -Penv=test deploy
call gradlew  -Penv=prod deploy
call gradlew clean
:END