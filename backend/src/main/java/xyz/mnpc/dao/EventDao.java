package xyz.mnpc.dao;

import com.google.gson.JsonArray;
import xyz.mnpc.model.Event;
import xyz.mnpc.model.EventMonth;
import xyz.mnpc.model.EventStudent;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EventDao {

    private final DataSource dataSource;

    public EventDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public int getTotalAmountByType(String type) {
        String sql = """
            SELECT SUM(es.payment_amount) AS total 
            FROM academics.events_students es 
            JOIN academics.events e 
            ON es.event_id = e.id 
            WHERE e.type = ? 
            AND es.is_paid = true
            """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, type);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching total amount for type: " + type, e);
        }
        return 0;
    }

    public void insertEvent(Event ev) {
        String sql = "INSERT INTO academics.events (name, type, due_date, amount) VALUES (?, ?, ?::date, ?) RETURNING id";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, ev.getName());
            ps.setString(2, ev.getType());
            ps.setString(3, ev.getDueDate());
            ps.setInt(4, ev.getAmount());

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ev.setId(rs.getInt(1));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<EventMonth> getEventsByMonth(String type) {
        List<EventMonth> results = new ArrayList<>();
        String sql = """
                    SELECT
                      TO_CHAR(e.due_date, 'YYYY-MM') AS month,
                      ROUND(COUNT(*) FILTER (WHERE es.is_paid) * 100.0 / NULLIF(COUNT(*), 0), 2) AS percent_paid
                    FROM
                      academics.events e
                    JOIN
                      academics.events_students es ON e.id = es.event_id
                    WHERE
                      e.type = ?
                    GROUP BY
                      TO_CHAR(e.due_date, 'YYYY-MM')
                    ORDER BY
                      month;
                    """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, type);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String month = rs.getString("month");
                BigDecimal percentPaid = rs.getBigDecimal("percent_paid");
                results.add(new EventMonth(month, percentPaid));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return results;
    }

    public List<Event> getAllEvents() {
        List<Event> results = new ArrayList<>();
        String sql = """
                SELECT id,
                    name,
                    type,
                    amount,
                    due_date
                FROM academics.events
                ORDER BY id
                """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                int eventID = rs.getInt("id");
                String name = rs.getString("name");
                String type = rs.getString("type");
                int amount = rs.getInt("amount");
                String due_date = rs.getString("due_date");
                results.add(new Event(eventID, name, type, amount, due_date));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return results;
    }

    public List<EventStudent> getEventsStudents() {
        List<EventStudent> results = new ArrayList<>();
        String sql = """
                SELECT
                    es.id,
                    es.student_id,
                    s.name AS student_name,
                    es.event_id,
                    es.is_paid,
                    es.payment_amount,
                    es.payment_date,
                    es.payment_receipts
                FROM academics.events_students es
                JOIN academics.students s
                ON es.student_id = s.id
                ORDER BY es.event_id, es.student_id
                """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt("id");
                int studentID = rs.getInt("student_id");
                String studentName = rs.getString("student_name");
                int eventID = rs.getInt("event_id");
                boolean isPaid = rs.getBoolean("is_paid");
                int paymentAmount = rs.getInt("payment_amount");
                String paymentDate = rs.getString("payment_date");
                String paymentReceipts = rs.getString("payment_receipts");
                results.add(new EventStudent(id, studentID, studentName, eventID, isPaid, paymentAmount, paymentDate, paymentReceipts));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return results;
    }

    public List<EventStudent> getEventsStudentsByEventID(int eventID) {
        List<EventStudent> results = new ArrayList<>();
        String sql = """
                SELECT
                    es.id,
                    es.student_id,
                    s.name AS student_name,
                    es.is_paid,
                    es.payment_amount,
                    es.payment_date,
                    es.payment_receipts
                FROM academics.events_students es
                JOIN academics.students s
                ON es.student_id = s.id
                WHERE es.event_id = ?
                ORDER BY es.event_id, es.student_id
                """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ) {
            ps.setInt(1, eventID);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                int studentID = rs.getInt("student_id");
                String studentName = rs.getString("student_name");
                boolean isPaid = rs.getBoolean("is_paid");
                int paymentAmount = rs.getInt("payment_amount");
                String paymentDate = rs.getString("payment_date");
                String paymentReceipts = rs.getString("payment_receipts");
                results.add(new EventStudent(id, studentID, studentName, eventID, isPaid, paymentAmount, paymentDate, paymentReceipts));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return results;
    }

    public void assignStudentsToEvent(List<Integer> studentIds, int eventId) {
        String sql = """
        INSERT INTO academics.events_students (student_id, event_id, is_paid, payment_amount, payment_date, payment_receipts)
        VALUES (?, ?, false, 0, NULL, '{}'::jsonb)
        ON CONFLICT (student_id, event_id) DO NOTHING
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            for (Integer studentId : studentIds) {
                ps.setInt(1, studentId);
                ps.setInt(2, eventId);
                ps.addBatch();
            }

            ps.executeBatch();

        } catch (SQLException e) {
            e.printStackTrace(); // Or handle it more gracefully
        }
    }

    public void updatePayment(String eventID, String studentID, String paymentAmount, String paymentDate, List<String> paymentReceipts) {
        String sql = """
        UPDATE academics.events_students
        SET is_paid = true,
        payment_amount = ?,
        payment_date = ?::date,
        payment_receipts = ?::jsonb
        WHERE student_id = ?
        AND event_id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, Integer.parseInt(paymentAmount));
            ps.setString(2, paymentDate);
            if (paymentReceipts.isEmpty()) {
                ps.setString(3, "{}");
            } else {
                JsonArray receipts = new JsonArray();
                paymentReceipts.forEach(receipts::add);
                ps.setString(3, receipts.toString());
            }
            ps.setInt(4, Integer.parseInt(studentID));
            ps.setInt(5, Integer.parseInt(eventID));
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace(); // Or handle it more gracefully
        }
    }

}
