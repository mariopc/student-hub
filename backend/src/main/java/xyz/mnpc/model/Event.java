package xyz.mnpc.model;

import com.google.gson.annotations.SerializedName;

public class Event {

    @SerializedName("id")
    private int id;

    @SerializedName("name")
    private String name;

    @SerializedName("type")
    private String type;

    @SerializedName("amount")
    private int amount;

    @SerializedName("due_date")
    private String dueDate;

    public Event(int ID, String name, String type, int amount, String due_date) {
        this.id = ID;
        this.name = name;
        this.type = type;
        this.amount = amount;
        this.dueDate = due_date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    @Override
    public String toString() {
        return "Event{" +
                "ID=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", amount=" + amount +
                ", due_date='" + dueDate + '\'' +
                '}';
    }
}
