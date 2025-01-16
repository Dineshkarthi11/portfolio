import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




import React, { useState } from "react";

const Calendar = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const [events, setEvents] = useState([]);

  const addEvent = (day, time) => {
    const title = prompt("Enter event title:");
    if (title) {
      const duration = prompt("Enter event duration (in hours):");
      if (duration) {
        setEvents([
          ...events,
          { id: Date.now(), title, day, time, duration: `${duration} hrs` },
        ]);
      }
    }
  };

  const removeEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const styles = {
    calendar: {
      display: "flex",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif",
    },
    dayHeader: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      backgroundColor: "#f1f3f4",
      padding: "10px",
    },
    day: {
      textAlign: "center",
      fontWeight: "bold",
      padding: "5px",
    },
    calendarBody: {
      display: "flex",
      flexDirection: "row",
    },
    timeColumn: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#e8eaed",
      padding: "5px",
    },
    timeSlot: {
      height: "50px",
      textAlign: "center",
      lineHeight: "50px",
      borderBottom: "1px solid #ccc",
    },
    dayColumns: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      flexGrow: 1,
    },
    dayColumn: {
      display: "flex",
      flexDirection: "column",
      borderLeft: "1px solid #ccc",
    },
    slot: {
      height: "50px",
      borderBottom: "1px solid #ccc",
      position: "relative",
      cursor: "pointer",
    },
    slotHover: {
      backgroundColor: "#f1f3f4",
    },
    eventCard: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      backgroundColor: "#4285f4",
      color: "white",
      borderRadius: "5px",
      padding: "5px",
      fontSize: "12px",
      cursor: "pointer",
    },
    eventCardTitle: {
      margin: "0",
      fontSize: "14px",
    },
    eventCardDetails: {
      margin: "0",
      fontSize: "12px",
    },
  };

  return (
    <div style={styles.calendar}>
      {/* Day Header */}
      <div style={styles.dayHeader}>
        {days.map((day, index) => (
          <div style={styles.day} key={index}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div style={styles.calendarBody}>
        {/* Time Slots Column */}
        <div style={styles.timeColumn}>
          {timeSlots.map((time, index) => (
            <div style={styles.timeSlot} key={index}>
              {time}
            </div>
          ))}
        </div>

        {/* Days Columns */}
        <div style={styles.dayColumns}>
          {days.map((_, dayIndex) => (
            <div style={styles.dayColumn} key={dayIndex}>
              {timeSlots.map((time, timeIndex) => (
                <div
                  key={`${dayIndex}-${timeIndex}`}
                  style={styles.slot}
                  onClick={() => addEvent(dayIndex, time)}
                >
                  {events
                    .filter((event) => event.day === dayIndex && event.time === time)
                    .map((event) => (
                      <div
                        key={event.id}
                        style={styles.eventCard}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeEvent(event.id);
                        }}
                      >
                        <h4 style={styles.eventCardTitle}>{event.title}</h4>
                        <p style={styles.eventCardDetails}>
                          {`${event.time} (${event.duration})`}
                        </p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
