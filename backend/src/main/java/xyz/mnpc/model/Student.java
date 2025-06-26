package xyz.mnpc.model;

public class Student {

    private int id;
    private String name;
    private String notes;
    private String avatar; // Could be a URL or file path

    public Student(int id, String name, String notes, String avatar) {
        this.id = id;
        this.name = name;
        this.notes = notes;
        this.avatar = avatar;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", notes='" + notes + '\'' +
                ", avatar='" + avatar + '\'' +
                '}';
    }
}
