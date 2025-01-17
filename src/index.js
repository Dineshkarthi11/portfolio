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








import * as React from "react";
import styles from './Calendar.module.css';

const viewOptions = ['Day', 'Week', 'Month'];

function Calendar() {
  return (
    <div className={styles.calendarContainer}>
      <div className={styles.monthSelector}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/83bbc0323c375ba7c057fb4d049f423653f98d6d96420f13d0cdb3a41f6e47fd?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39"
          className={styles.monthIcon}
          alt=""
        />
        <div className={styles.monthWrapper}>
          <div className={styles.monthText}>September</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/470b4bda536400d451b3310a035d500bc8b06e11f56376af9cfab55d828520f0?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39"
            className={styles.monthIcon}
            alt=""
          />
        </div>
      </div>
      <div className={styles.viewControls}>
        <div className={styles.viewToggle} role="group" aria-label="Calendar view options">
          {viewOptions.map((option, index) => (
            <div
              key={option}
              className={index === 1 ? styles.activeViewOption : styles.viewOption}
              role="button"
              tabIndex={0}
              aria-pressed={index === 1}
            >
              {option}
            </div>
          ))}
        </div>
        <button 
          className={styles.toggleButton}
          aria-label="Toggle calendar view"
          tabIndex={0}
        />
      </div>
    </div>
  );
}

export default Calendar;

.calendarContainer {
  border-radius: 10px 10px 0 0;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-top: 10px;
  width: 100%;
  max-width: 1204px;
  align-items: start;
  gap: 20px;
  font-family: Inter, sans-serif;
  color: rgba(0, 0, 0, 1);
  font-weight: 600;
  text-align: center;
  letter-spacing: -0.08px;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 47px;
}

.monthSelector {
  display: flex;
  gap: 9px;
  font-size: 16px;
  line-height: 1;
}

.monthIcon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
}

.monthWrapper {
  display: flex;
  gap: 2px;
}

.monthText {
  flex-grow: 1;
  margin: auto 0;
}

.viewControls {
  display: flex;
  gap: 40px 49px;
  font-size: 14px;
  line-height: 1;
}

.viewToggle {
  border-radius: 5px;
  background-color: rgba(221, 214, 255, 1);
  display: flex;
  align-items: center;
  gap: 17px;
  padding: 2px 24px;
}

.viewOption {
  align-self: stretch;
  margin: auto 0;
}

.activeViewOption {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  align-self: stretch;
  padding: 3px 15px 12px;
}

.toggleButton {
  border-radius: 5px;
  background-color: rgba(230, 234, 238, 1);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  width: 40px;
  height: 25px;
  margin: auto 0;
}

@media (max-width: 991px) {
  .calendarContainer {
    max-width: 100%;
    padding: 0 20px;
  }
  
  .monthSelector,
  .monthWrapper,
  .viewControls,
  .viewToggle,
  .activeViewOption {
    white-space: initial;
  }
  
  .viewToggle {
    padding: 0 20px;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

import React from 'react';
import styles from './WeeklySchedule.module.css';

export const DaySchedule = ({ day, date, time }) => {
  return (
    <>
      <div className={styles.dayContainer}>
        <div>{`${day} ${date}`}</div>
        <div className={styles.timeDisplay}>{time}</div>
      </div>
      <div className={styles.lightDivider} />
    </>
  );
};

import React from 'react';
import { DaySchedule } from './DaySchedule';
import styles from './WeeklySchedule.module.css';

const scheduleData = [
  { day: 'Sunday', date: '8', time: '4:00:12' },
  { day: 'Monday', date: '3', time: '4:00:12' },
  { day: 'Tuesday', date: '8', time: '4:00:12' },
  { day: 'Wednesday', date: '6', time: '4:00:12' },
  { day: 'Thursday', date: '8', time: '4:00:12' },
  { day: 'Friday', date: '12', time: '4:00:12' },
  { day: 'Saturday', date: '16', time: '4:00:12' }
];

export const WeeklySchedule = () => {
  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.navigationSection}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/83bbc0323c375ba7c057fb4d049f423653f98d6d96420f13d0cdb3a41f6e47fd?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39"
          className={styles.navigationIcon}
          alt="Previous week"
        />
        <div className={styles.divider} />
        <DaySchedule day="Sunday" date="8" time="4:00:12" />
      </div>
      <div className={styles.daysSection}>
        {scheduleData.slice(1).map((schedule, index) => (
          <DaySchedule
            key={index}
            day={schedule.day}
            date={schedule.date}
            time={schedule.time}
          />
        ))}
      </div>
      <div className={styles.navigationSection}>
        <div className={styles.divider} />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/470b4bda536400d451b3310a035d500bc8b06e11f56376af9cfab55d828520f0?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39"
          className={styles.navigationIcon}
          alt="Next week"
        />
      </div>
    </div>
  );
};

.scheduleContainer {
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-top: 11px;
  width: 1208px;
  max-width: 100%;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2px 37px;
}

@media (max-width: 991px) {
  .scheduleContainer {
    padding: 0 20px;
  }
}

.navigationSection {
  display: flex;
  align-items: center;
  gap: 40px 47px;
  color: #000;
  text-align: center;
  letter-spacing: -0.08px;
  font: 600 16px/1 Inter, sans-serif;
}

.navigationIcon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  align-self: stretch;
  margin: auto 0;
}

.divider {
  align-self: stretch;
  width: 1px;
  height: 75px;
  border: 1px solid #000;
}

.dayContainer {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  margin: auto 0;
}

.timeDisplay {
  align-self: center;
  margin-top: 10px;
}

.daysSection {
  display: flex;
  gap: 24px;
  color: #000;
  text-align: center;
  letter-spacing: -0.08px;
  flex-wrap: wrap;
  padding: 0 1px;
  font: 600 16px/1 Inter, sans-serif;
}

.lightDivider {
  width: 1px;
  height: 76px;
  border: 1px solid #dad0d0;
}

import React from 'react';
import styles from './TimelineCard.module.css';

export function TimelineCard({ title, time }) {
  return (
    <div className={styles.card}>
      <div className={styles.projectBadge}>. Tudu project</div>
      <div className={styles.statusIndicator} />
      <div className={styles.title}>
        {title}
        <br /> Inner page
      </div>
      <div className={styles.timeLabel}>Total Time</div>
      <div className={styles.timeValue}>{time}</div>
    </div>
  );
}

.card {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 19px 18px;
}

.projectBadge {
  border-radius: 5px;
  background-color: rgba(217, 217, 217, 1);
  align-self: stretch;
  color: rgba(103, 0, 233, 1);
  line-height: 1.8;
  padding: 0 22px 9px;
}

.statusIndicator {
  border-radius: 5px;
  background-color: rgba(217, 217, 217, 1);
  display: flex;
  margin-top: 7px;
  width: 26px;
  height: 19px;
}

.title {
  color: rgba(0, 0, 0, 1);
  margin-top: 13px;
  line-height: 18px;
}

.timeLabel {
  color: rgba(178, 173, 173, 1);
  margin-top: 66px;
}

.timeValue {
  color: rgba(80, 65, 65, 1);
}

@media (max-width: 991px) {
  .projectBadge {
    padding: 0 20px;
  }
  
  .timeLabel {
    margin-top: 40px;
  }
}

import React from 'react';
import { TimelineCard } from './TimelineCard';
import styles from './Timeline.module.css';

export function Timeline() {
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00'];
  const cardData = [
    { title: 'Tudu - Dashboard', time: '2:05:33' },
    { title: 'Tudu - Dashboard', time: '2:05:33' },
    { title: 'Tudu - Dashboard', time: '2:05:33' },
    { title: 'Tudu - Dashboard', time: '2:05:33' },
    { title: 'Tudu - Dashboard', time: '2:05:33' },
    { title: 'Tudu - Dashboard', time: '2:05:33' },
    { title: 'Tudu - Dashboard', time: '2:05:33' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.timeColumn}>
        {timeSlots.map((time, index) => (
          <div key={time} className={index > 0 ? styles.timeSlot : ''}>
            {time}
          </div>
        ))}
      </div>
      <div className={styles.contentArea}>
        <div className={styles.divider} />
        <div className={styles.cardsContainer}>
          {cardData.map((card, index) => (
            <TimelineCard
              key={index}
              title={card.title}
              time={card.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


.container {
  display: flex;
  margin-top: 11px;
  width: 100%;
  max-width: 1211px;
  align-items: flex-start;
  gap: 5px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  text-align: center;
  letter-spacing: -0.08px;
  flex-wrap: wrap;
}

.timeColumn {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  align-self: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  color: rgba(0, 0, 0, 1);
  white-space: nowrap;
  line-height: 1.2;
  padding: 59px 16px;
}

.timeSlot {
  margin-top: 107px;
}

.contentArea {
  align-self: end;
  display: flex;
  margin-top: 60px;
  flex-direction: column;
  font-size: 10px;
  flex-grow: 1;
  flex-basis: 0;
  width: fit-content;
}

.divider {
  height: 1px;
  border: 1px solid rgba(211, 201, 201, 1);
}

.cardsContainer {
  display: flex;
  align-items: flex-start;
  gap: 38px;
  flex-wrap: wrap;
  margin: 4px 0 0 26px;
}

@media (max-width: 991px) {
  .container {
    max-width: 100%;
  }
  
  .timeColumn {
    white-space: initial;
  }
  
  .timeSlot {
    margin-top: 40px;
  }
  
  .contentArea {
    max-width: 100%;
    margin-top: 40px;
  }
  
  .divider {
    max-width: 100%;
  }
  
  .cardsContainer {
    margin-right: 7px;
  }
}


This is the one page component codes 

ive given seperately 

please combine and give me the proper code without changes any designs and codes

this is the calendar events lists 

ive given all the code 

give me the codes without changes the designs and codes ...dont give short codes

give me the converting codes of component wise 

combine and give me the converting all codes

