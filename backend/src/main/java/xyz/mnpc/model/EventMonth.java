package xyz.mnpc.model;

import java.math.BigDecimal;

public class EventMonth {

    private String month;
    private BigDecimal percentagePaid;

    public EventMonth(String month, BigDecimal percentagePaid) {
        this.month = month;
        this.percentagePaid = percentagePaid;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public BigDecimal getPercentagePaid() {
        return percentagePaid;
    }

    public void setPercentagePaid(BigDecimal percentagePaid) {
        this.percentagePaid = percentagePaid;
    }

    @Override
    public String toString() {
        return "EventMonth{" +
                "month='" + month + '\'' +
                ", percentagePaid='" + percentagePaid + '\'' +
                '}';
    }
}
