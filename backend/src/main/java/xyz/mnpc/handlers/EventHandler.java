package xyz.mnpc.handlers;

import com.google.gson.Gson;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.util.FileUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import xyz.mnpc.dao.EventDao;
import xyz.mnpc.model.Event;
import xyz.mnpc.model.EventMonth;
import xyz.mnpc.model.EventStudent;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

public class EventHandler {

    private static final Logger log = LoggerFactory.getLogger(EventHandler.class);
    private final Gson g = new Gson();
    final EventDao ed;

    public EventHandler(DataSource dataSource) {
        ed = new EventDao(dataSource);
    }

    public void getTotalAmountByType(Context ctx) {
        String type = ctx.pathParam("type");
        int totalAmount = ed.getTotalAmountByType(type);
        ctx.result(g.toJson(totalAmount));
    }

    public void getEventsByMonth(Context ctx) throws SQLException {
        List<EventMonth> result = ed.getEventsByMonth("CUOTA CURSO");
        ctx.result(g.toJson(result));
    }

    public void getAllEvents(Context ctx) {
        List<Event> events = ed.getAllEvents();
        ctx.result(g.toJson(events));
    }

    public void getAllEventStudents(Context ctx) {
        List<EventStudent> events = ed.getEventsStudents();
        ctx.result(g.toJson(events));
    }

    public void getEventStudentsByEventID(Context ctx) {
        try {
            int eventID = Integer.parseInt(ctx.pathParam("eventID"));
            List<EventStudent> events = ed.getEventsStudentsByEventID(eventID);
            ctx.result(g.toJson(events));
        } catch (NumberFormatException e) {
            throw new BadRequestResponse("Invalid Event ID");
        }
    }

    public void insertEvent(Context ctx) {
        log.info("Adding event");
        try {
            String name = ctx.formParam("name");
            String type = ctx.formParam("type");
            int amount = Integer.parseInt(Objects.requireNonNull(ctx.formParam("amount")));
            String due_date = ctx.formParam("due_date");
            Event ev = new Event(1, name, type, amount, due_date);
            ed.insertEvent(ev);
        }catch (NumberFormatException | NullPointerException e) {
            throw new BadRequestResponse("Invalid amount");
        }
    }

    public List<Integer> parseStudentIds(String input) {
        return Arrays.stream(
                        input.replaceAll("\\[|]|\\s", "") // remove brackets and spaces
                                .split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }

    public void assignStudents(Context ctx) {
        try {
            String studentIDs = Objects.requireNonNull(ctx.formParam("studentIdsToAssign"));
            int eventID = Integer.parseInt(Objects.requireNonNull(ctx.formParam("eventId")));
            ed.assignStudentsToEvent(parseStudentIds(studentIDs), eventID);
        } catch (NullPointerException | NumberFormatException e) {
            throw new BadRequestResponse("Invalid IDs");
        }
    }

    public void putPayment(Context ctx) {
        log.info("Adding payment");
        String eventID = ctx.pathParam("eventID");
        String studentID = ctx.pathParam("studentID");
        String paymentAmount = ctx.formParam("paymentAmount");
        String paymentDate = ctx.formParam("paymentDate");
        List<String> paymentReceipts = new ArrayList<>();
        ctx.uploadedFiles("files").forEach(uploadedFile -> {
            String fileName = getReceiptName(eventID, studentID, paymentDate, uploadedFile.extension());
            paymentReceipts.add(fileName);
            FileUtil.streamToFile(uploadedFile.content(), "assets/receipts/" + fileName);
        });
        log.info("PAYMENT: [eventID: {}] [studentID: {}] [paymentAmount: {}] [paymentDate: {}] [paymentReceipts: {}]", eventID, studentID, paymentAmount, paymentDate, paymentReceipts);
        ed.updatePayment(eventID, studentID, paymentAmount, paymentDate, paymentReceipts);
    }

    private String getReceiptName(String eventID, String studentID, String paymentDate, String extension) {
        return "PaymentReceipt_" + UUID.randomUUID().toString().replace("-", "") + "_" + eventID + "_" + studentID + "_" + paymentDate + extension;
    }
}
