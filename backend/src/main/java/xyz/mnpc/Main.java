package xyz.mnpc;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import io.javalin.Javalin;
import io.javalin.config.SizeUnit;
import io.javalin.http.staticfiles.Location;
import io.javalin.util.JavalinBindException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.gson.JsonObject;
import xyz.mnpc.config.DatabaseConfig;
import xyz.mnpc.handlers.EventHandler;
import xyz.mnpc.handlers.StudentHandler;

import javax.sql.DataSource;

public class Main {
    private static final Logger log = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) {

        DataSource dataSource = DatabaseConfig.getDataSource();
        EventHandler eventHandler = new EventHandler(dataSource);
        StudentHandler studentHandler = new StudentHandler(dataSource);

        Javalin app = Javalin.create(config -> {
            config.staticFiles.add("/app/assets", Location.EXTERNAL);
            config.showJavalinBanner = false;
            config.useVirtualThreads = true;
            config.http.defaultContentType = "application/json";
            config.jetty.multipartConfig.maxFileSize(100, SizeUnit.MB);
            config.jetty.multipartConfig.maxInMemoryFileSize(10, SizeUnit.MB);
            config.jetty.multipartConfig.maxTotalRequestSize(600, SizeUnit.MB);
        });
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            log.info("Executing Shutdown Hook...");
            app.stop();
        }));

        app.get("/api/v1/students", studentHandler::getAllStudents);

        app.get("/api/v1/student/{id}", studentHandler::getStudentByID);

        app.post("/api/v1/student/{id}", studentHandler::updateStudent);

        app.post("/api/v1/student", studentHandler::addStudent);

        app.get("/api/v1/get-event-by-month/{type}", eventHandler::getEventsByMonth);
        app.get("/api/v1/get-total-amount/{type}", eventHandler::getTotalAmountByType);
        app.get("/api/v1/events", eventHandler::getAllEvents);
        app.post("/api/v1/event", eventHandler::insertEvent);
        app.get("/api/v1/events-students", eventHandler::getAllEventStudents);
        app.get("/api/v1/events-students/{eventID}", eventHandler::getEventStudentsByEventID);
        app.post("/api/v1/event-assignment", eventHandler::assignStudents);
        app.put("/api/v1/event/{eventID}/student/{studentID}/payment", eventHandler::putPayment);

        app.after("*", ctx -> {
            if (!ctx.status().isSuccess()) {
                try {
                    JsonObject response = new Gson().fromJson(ctx.result(), JsonObject.class);
                    if (response.isJsonObject() && response.has("type") && response.has("status")) {
                        response.remove("type");
                        response.remove("status");
                        ctx.result(response.toString());
                    }
                } catch (JsonSyntaxException e) {
                    log.error("Response is not a valid json [{}]", ctx.result());
                }
            }
        });
        try {
            app.start(3030);
        } catch (JavalinBindException e) {
            log.error(e.getMessage());
        }
    }
}