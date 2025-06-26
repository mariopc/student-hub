package xyz.mnpc;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import xyz.mnpc.db.DBAccess;
import xyz.mnpc.db.PostgresConfig;

import javax.sql.DataSource;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;


public class Main {
    private static final Logger log = LoggerFactory.getLogger(Main.class);
    private static final HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();

    public static void main(String[] args) {
        DataSource dataSource = PostgresConfig.getDataSource();
        JsonArray arr = DBAccess.getCuotas(dataSource, "Cecilia");
        for (JsonElement element : arr) {
            try {
                sendMail(element.getAsJsonObject().toString());
            } catch (Exception e) {
                log.error("Sending Mail Exception ", e);
            }

        }
    }

    private static void sendMail(String body) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://127.0.0.1:8080/api/send"))
                .version(HttpClient.Version.HTTP_1_1)
                .timeout(Duration.ofSeconds(10))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8))
                .build();
        Instant start = Instant.now();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        Instant end = Instant.now();
        if (response.statusCode() != 200) {
            log.error("Error sending mail: {} [et: {}ms]", response.body(), Duration.between(start, end).toMillis());
            return;
        }
        log.info("Mail sent successfully: {} [et: {}ms]", response.body(), Duration.between(start, end).toMillis());
    }


}