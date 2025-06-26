package xyz.mnpc.handlers;

import com.google.gson.Gson;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import io.javalin.util.FileUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import xyz.mnpc.dao.StudentDao;
import xyz.mnpc.model.Student;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StudentHandler {

    private static final Logger log = LoggerFactory.getLogger(StudentHandler.class);

    private final StudentDao dao;
    private final Gson g = new Gson();

    public StudentHandler(DataSource dataSource) {
        this.dao = new StudentDao(dataSource);
    }

    public void addStudent(Context ctx) {
        log.info("Adding student");
        String name = ctx.formParam("name");
        String notes = ctx.formParam("notes");
        String picture = null;
        if (!ctx.uploadedFiles().isEmpty() && !ctx.uploadedFiles().getFirst().filename().isEmpty()) {
            picture = ctx.uploadedFiles().getFirst().filename();
            FileUtil.streamToFile(ctx.uploadedFiles().getFirst().content(), "/assets/profile_pic/" + picture);
        }
        Student student = new Student(1, name, notes, picture);
        log.info("new student: {}", student);
        dao.insertStudent(student);
    }

    public void getAllStudents(Context ctx) {
        List<Student> students = dao.getAllStudents();
        ctx.result(g.toJson(students));
    }

    public void updateStudent(Context ctx) {
        log.info("StudentID: {}", ctx.pathParam("id"));
        try {
            int studentID = Integer.parseInt(ctx.pathParam("id"));
            String name = ctx.formParam("name");
            String notes = ctx.formParam("notes");
            String picture = null;
            if (!ctx.uploadedFiles().isEmpty() && !ctx.uploadedFiles().getFirst().filename().isEmpty()) {
                picture = ctx.uploadedFiles().getFirst().filename();
            }
            Student student = new Student(studentID, name, notes, picture);
            dao.updateStudent(student);
        } catch (NumberFormatException e) {
            throw new BadRequestResponse("Invalid student ID");
        }
    }

    public void getStudentByID(Context ctx) {
        try {
            int studentID = Integer.parseInt(ctx.pathParam("id"));
            Student student = dao.getStudentById(studentID);
            log.info("stuent:{}", student);
            if (student == null) {
                Map<String, String> details = new HashMap<>();
                details.put("error", String.format("Student ID %d not found", studentID));
                throw new NotFoundResponse("Student not found", details);
            }
            ctx.result(g.toJson(student));
        } catch (NumberFormatException e) {
            throw new BadRequestResponse("Invalid Student ID");
        }
    }
}
