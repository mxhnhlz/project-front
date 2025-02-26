import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from '../main.module.css'

const MyCalendar = () => {
  const today = new Date()

  return (
    <Calendar
      locale='ru-RU'
      maxDetail='month'
      minDetail='month'
      prevLabel='‹'
      nextLabel='›'
      prev2Label={null}
      next2Label={null}
      className={styles.cal}
      minDate={today}
      navigationLabel={({ date, locale }) => {
        const monthYear = new Intl.DateTimeFormat(locale, {
          month: 'short',
          year: 'numeric',
        }).format(date)

        const capitalizedMonthYear =
          monthYear.charAt(0).toUpperCase() + monthYear.slice(1)

        return capitalizedMonthYear.replace('г.', '').replace('.', '')
      }}
    />
  )
}

export default MyCalendar
