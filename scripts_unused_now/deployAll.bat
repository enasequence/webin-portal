:PROMPT
    SET /P AREYOUSURE=Are you sure spring boot jars will be deployed in production (Y/[N])?
    IF /I "%AREYOUSURE%" NEQ "Y" GOTO END
    call gradlew -Penv=dev clean deploy
    call gradlew -Penv=test clean deploy
    call gradlew -Penv=prod clean deploy
    call gradlew clean
    :END