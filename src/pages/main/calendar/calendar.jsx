import { React, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./calendar.module.css";
import Button from "@mui/material/Button";
import db from "../../../api/db";

const MyCalendar = ({ offer, userId }) => {
  const today = new Date();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selecting, setSelecting] = useState("start");
  const [bookedDays, setBookedDays] = useState([]);
  const [isDateBlocked, setIsDateBlocked] = useState(true);

  useEffect(() => {
    const fetchBookedDays = async () => {
      try {
        const bookedDaysData = await db.getOfferDays(offer.id);
        setBookedDays(bookedDaysData);
      } catch (error) {
        console.error("Failed to fetch booked days:", error);
      }
    };
    fetchBookedDays();
  }, [offer.id]);

  const onChange = (date) => {
    if (selecting === "start") {
      if (endDate < date || endDate === null) {
        setSelecting("end");
        setEndDate(date);
      }
      setStartDate(date);
    } else {
      if (startDate > date || startDate === null) setStartDate(date);
      setEndDate(date);
    }
  };

  useEffect(() => {
    const isOverlap = bookedDays.some((bookedDay) => {
      const bookedStart = new Date(bookedDay.start);
      const bookedEnd = new Date(bookedDay.end);
      // Проверка на пересечение диапазонов (пиздец костыль, но работает)
      return startDate <= bookedEnd && endDate >= bookedStart;
    });

    setIsDateBlocked(isOverlap);
  }, [startDate, endDate]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (
        bookedDays.some((bookedDay) => {
          const bookedStart = new Date(bookedDay.start);
          const bookedEnd = new Date(bookedDay.end);
          return date >= bookedStart && date <= bookedEnd;
        })
      ) {
        return styles.bookedDay;
      }
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

  const handleSendRequest = async () => {
    try {
      const data = await db.createRent(offer.id, userId, startDate, endDate);
      alert("Запрос успешно отправлен!"); // Replace with a better notification
      try {
        await db.sendMessage(
          offer.tg_id,
          `На объявление ${offer.name} появилось предложение, проверьте входящие аренды.`
        ); //TODO better message
      } catch (error) {
        console.error("Error in sendMessage in calendar's handleSendRequest");
      }
    } catch (error) {
      console.error("Error creating rent:", error);
      alert("Не удалось отправить запрос. Попробуйте позже."); // Replace with a better error message
    }
  };

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);

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
        maxDate={maxDate}
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
          disabled={isDateBlocked}
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
          onClick={handleSendRequest}
        >
          Отправить запрос арендодателю
        </Button>
      </div>
      <div className={`${styles.error} ${isDateBlocked ? styles.show : ""}`}>
        Выбранные даты недоступны для аренды.
      </div>
    </div>
  );
};

export default MyCalendar;
