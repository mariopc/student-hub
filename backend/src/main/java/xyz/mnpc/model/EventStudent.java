package xyz.mnpc.model;

import com.google.gson.annotations.SerializedName;

public class EventStudent {

    @SerializedName("id")
    private int id;

    @SerializedName("student_id")
    private int studentID;

    @SerializedName("student_name")
    private String studentName;

    @SerializedName("event_id")
    private int eventID;

    @SerializedName("is_paid")
    private boolean isPaid;

    @SerializedName("payment_amount")
    private int paymentAmount;

    @SerializedName("payment_date")
    private String paymentDate;

    @SerializedName("payment_receipts")
    private String paymentReceipts;

    public EventStudent(int eventStudentID, int studentID, String studentName, int eventID, boolean isPaid, int paymentAmount, String paymentDate, String paymentReceipts) {
        this.id = eventStudentID;
        this.studentID = studentID;
        this.studentName = studentName;
        this.eventID = eventID;
        this.isPaid = isPaid;
        this.paymentAmount = paymentAmount;
        this.paymentDate = paymentDate;
        this.paymentReceipts = paymentReceipts;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStudentID() {
        return studentID;
    }

    public void setStudentID(int studentID) {
        this.studentID = studentID;
    }

    public int getEventID() {
        return eventID;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public void setPaid(boolean paid) {
        isPaid = paid;
    }

    public int getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(int paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(String paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPaymentReceipts() {
        return paymentReceipts;
    }

    public void setPaymentReceipts(String paymentReceipts) {
        this.paymentReceipts = paymentReceipts;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    @Override
    public String toString() {
        return "EventStudent{" +
                "id=" + id +
                ", studentID=" + studentID +
                ", studentName='" + studentName + '\'' +
                ", eventID=" + eventID +
                ", isPaid=" + isPaid +
                ", paymentAmount=" + paymentAmount +
                ", paymentDate='" + paymentDate + '\'' +
                ", paymentReceipts='" + paymentReceipts + '\'' +
                '}';
    }
}
