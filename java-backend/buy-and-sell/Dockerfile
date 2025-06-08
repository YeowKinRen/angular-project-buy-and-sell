# Dockerfile
FROM eclipse-temurin:17-jdk as builder
VOLUME /tmp
COPY target/buy-and-sell-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
