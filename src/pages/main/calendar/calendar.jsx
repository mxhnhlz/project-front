import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./calendar.module.css";
import Button from "@mui/material/Button";

const MyCalendar = () => {
  const today = new Date();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selecting, setSelecting] = useState("start");

  const onChange = (date) => {
    if (selecting === "start") {
      if (endDate < date || endDate === null) setEndDate(date);
      setStartDate(date);
    } else {
      if (startDate > date || startDate === null) setStartDate(date);
      setEndDate(date);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (startDate && endDate) {
        if (
          startDate.getTime() === endDate.getTime() &&
          date.getTime() === startDate.getTime()
        ) {
          // Если начало и конец одинаковые
          return styles.singleDate;
        } else if (date.getTime() === startDate.getTime()) {
          // Если это начало диапазона
          return styles.startDateStyle;
        } else if (date.getTime() === endDate.getTime()) {
          // Если это конец диапазона
          return styles.endDateStyle;
        } else if (date > startDate && date < endDate) {
          // Если дата внутри диапазона
          return styles.selectedRange;
        }
      }
    }
  };

  const isRentAvailable = startDate !== null && endDate !== null;

  return (
    <div>
      <Calendar
        locale="ru-RU"
        maxDetail="month"
        minDetail="month"
        prevLabel="‹"
        nextLabel="›"
        prev2Label={null}
        next2Label={null}
        className={styles.cal}
        minDate={today}
        navigationLabel={({ date, locale }) => {
          const monthYear = new Intl.DateTimeFormat(locale, {
            month: "short",
            year: "numeric",
          }).format(date);
          const capitalizedMonthYear =
            monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
          return capitalizedMonthYear.replace("г.", "").replace(".", "");
        }}
        onChange={onChange}
        tileClassName={tileClassName}
      />
      <div className={styles.selectedDates}>
        <p
          onClick={() => setSelecting("start")}
          className={selecting === "start" ? styles.active : ""}
        >
          Начало: {startDate ? startDate.toLocaleDateString("ru-RU") : "—"}
        </p>
        <p
          onClick={() => setSelecting("end")}
          className={selecting === "end" ? styles.active : ""}
        >
          Конец: {endDate ? endDate.toLocaleDateString("ru-RU") : "—"}
        </p>
      </div>
      <div className={styles.modalActions}>
        <Button
          variant="outlined"
          disabled={!isRentAvailable}
          sx={{
            borderRadius: "12px",
            borderColor: "#006FFD",
            color: "#006FFD",
            padding: "8px 50px",
            "&:hover": {
              backgroundColor: "#006FFD",
              color: "white",
            },
            "&:disabled": {
              borderColor: "#ccc",
              color: "#ccc",
            },
          }}
          className="sendRequestButton"
        >
          Отправить запрос арендодателю
        </Button>
      </div>
    </div>
  );
};

export default MyCalendar;
