# Define the base image with the alias "deps"
# Set the working directory to /build
# Download dependencies and prepare offline build environment
FROM maven:3-eclipse-temurin-21 AS deps

WORKDIR /build

RUN --mount=type=bind,source=pom.xml,target=pom.xml \
    --mount=type=cache,target=/root/.m2 mvn dependency:go-offline -DskipTests

# Create a new stage based on the "deps" image, with the alias "package"
# Set the working directory to /build
# Copy the source code from the current directory into the container's build directory
# Build and package the Maven project using the offline dependencies prepared earlier
FROM deps AS package
WORKDIR /build
COPY ./src ./src/
RUN --mount=type=bind,source=pom.xml,target=pom.xml \
    --mount=type=cache,target=/root/.m2 \
    mvn package -DskipTests

# Create a new user account with the specified UID and no shell
# Switch to the new user account for the rest of the process
# Set the working directory to "app"
# Copy the built JAR file from the previous stage into this stage
# Expose port
# Define the entry point of the container: run the Java command to start the app
FROM eclipse-temurin:21-jre-jammy AS final

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

USER appuser

WORKDIR /app
COPY --from=package /build/target/student-hub-backend.jar ./
COPY ./assets/ ./assets/
EXPOSE 3030
ENTRYPOINT ["java","-jar", "student-hub-backend.jar"]