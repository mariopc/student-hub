package xyz.mnpc.db;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class DBAccess {

    private static final Map<String, String> productsConfig = new ConcurrentHashMap<>();
    private static final Logger log = LoggerFactory.getLogger(DBAccess.class);
    private static final Gson gson = new Gson();

    public static JsonArray getCuotas(DataSource dataSource, String searchParentName) {
        JsonArray cuotasCurso = new JsonArray();
        String sql = "SELECT * FROM academics.getCuotasCurso()";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String parentName = rs.getString("parent_name");
                if (searchParentName.equals(parentName)) {
                    String studentName = rs.getString("student_name");
                    String paidFees = rs.getString("paid_fees");
                    String dueFees = rs.getString("due_fees");
                    JsonObject cuota = new JsonObject();
                    cuota.addProperty("studentName", studentName);
                    cuota.addProperty("parentName", parentName);
                    cuota.add("paidFees", gson.fromJson(paidFees, JsonArray.class));
                    cuota.add("dueFees", gson.fromJson(dueFees, JsonArray.class));
                    cuota.addProperty("currentMonth", getCurrentMonth());
                    cuota.addProperty("schoolName", "Amancay 3ro Básico");
                    cuota.addProperty("contactName", "Mario Peña");
                    cuota.addProperty("contactEmail", "mario.pc@protonmail.com");
                    cuota.addProperty("contactPhone", "+569 5000 30 11");
                    cuota.addProperty("from", "Directiva 3ro <directiva@amancay.mnpc.xyz>");
                    JsonArray to = new JsonArray();
                    to.add(rs.getString("parent_email"));
                    cuota.add("to", to);
                    cuota.addProperty("subject", "Resumen cuotas curso en " + getCurrentMonth() + " 2025");
                    cuotasCurso.add(cuota);
                }
            }
        }
        catch (SQLException e) {
            log.error("Error getting CUOTAS CURSO from DB: {}", e.getMessage());
        }
        return cuotasCurso;
    }

    public static JsonArray getCuotas(DataSource dataSource) {
        JsonArray cuotasCurso = new JsonArray();
        String sql = "SELECT * FROM academics.getCuotasCurso()";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String studentName = rs.getString("student_name");
                String parentName = rs.getString("parent_name");
                String paidFees = rs.getString("paid_fees");
                String dueFees = rs.getString("due_fees");
                JsonObject cuota = new JsonObject();
                cuota.addProperty("studentName", studentName);
                cuota.addProperty("parentName", parentName);
                cuota.add("paidFees", gson.fromJson(paidFees, JsonArray.class));
                cuota.add("dueFees", gson.fromJson(dueFees, JsonArray.class));
                cuota.addProperty("currentMonth", getCurrentMonth());
                cuota.addProperty("schoolName", "Amancay 3ro Básico");
                cuota.addProperty("contactName", "Mario Peña");
                cuota.addProperty("contactEmail", "mario.pc@protonmail.com");
                cuota.addProperty("contactPhone", "+569 5000 30 11");
                cuota.addProperty("from", "Directiva 3ro <directiva@amancay.mnpc.xyz>");
                JsonArray to = new JsonArray();
                to.add(rs.getString("parent_email"));
                cuota.add("to", to);
                cuota.addProperty("subject", "Resumen cuotas curso en " + getCurrentMonth() + " 2025");
                cuotasCurso.add(cuota);
            }
        } catch (SQLException e) {
            log.error("Error getting CUOTAS CURSO from DB: {}", e.getMessage());
        }
        return cuotasCurso;
    }

    private static String getCurrentMonth() {
        LocalDate today = LocalDate.now();
        String monthInSpanish = today.getMonth().getDisplayName(TextStyle.FULL, Locale.of("es", "ES"));
        return monthInSpanish.substring(0,1).toUpperCase() + monthInSpanish.substring(1);
    }

}

