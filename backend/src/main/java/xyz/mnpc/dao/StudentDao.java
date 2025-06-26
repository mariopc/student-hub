package xyz.mnpc.dao;

import xyz.mnpc.model.Student;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;

public class StudentDao {
    private final DataSource dataSource;

    public StudentDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // Insert a new student
    public void insertStudent(Student student) {
        String sql = "INSERT INTO academics.students (name, notes, profile_pic) VALUES (?, ?, ?) RETURNING id";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, student.getName());
            ps.setString(2, student.getNotes());
            ps.setString(3, student.getAvatar());

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                student.setId(rs.getInt(1));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Retrieve a student by ID
    public Student getStudentById(int id) {
        String sql = "SELECT id, name, profile_pic as avatar, notes FROM academics.students WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return new Student(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("notes"),
                        rs.getString("avatar")
                );
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Retrieve all students
    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        String sql = "SELECT id, name, profile_pic as avatar, notes FROM academics.students";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                students.add(new Student(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("notes"),
                        rs.getString("avatar")
                ));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return students;
    }

    // Update a student
    public void updateStudent(Student student) {
        StringBuilder sql = new StringBuilder("UPDATE academics.students SET name = ?, notes = ?");
        if (student.getAvatar() != null) {
            sql.append(", avatar = ?");
        }
        sql.append(" WHERE id = ?");
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql.toString())) {

            ps.setString(1, student.getName());
            ps.setString(2, student.getNotes());
            if (student.getAvatar() != null) {
                ps.setString(3, student.getAvatar());
                ps.setInt(4, student.getId());
            } else {
                ps.setInt(3, student.getId());
            }
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Delete a student
    public void deleteStudent(int id) {
        String sql = "DELETE FROM students WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

