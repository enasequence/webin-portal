#!/usr/bin/env bash
./gradlew -Penv=localdev clean -Dorg.gradle.jvmargs="-XX:MaxPermSize=256M -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5015" bootRun