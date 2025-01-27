import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


import React, { useState } from 'react';

const Calendar = () => {
  const [showEventList, setShowEventList] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);

  const renderCalendarCell = (day, events) => {
    const MAX_VISIBLE_EVENTS = 1; // Show only 1 event initially
    const hiddenEvents = events.length > MAX_VISIBLE_EVENTS ? events.length - MAX_VISIBLE_EVENTS : 0;

    return (
      <div
        className={`calendar-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
        onClick={() => setSelectedDayEvents(events)} // Set events for the day
        onDoubleClick={() => console.log('Day double-clicked:', day.date)}
      >
        <div className="date-label">{day.date.getDate()}</div>
        {events.slice(0, MAX_VISIBLE_EVENTS).map((event) => (
          <div
            key={event.id}
            className={`event ${event.type}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEventDetails(event);
            }}
          >
            {event.title}
          </div>
        ))}
        {hiddenEvents > 0 && (
          <div
            className="more-events"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDayEvents(events);
              setShowEventList(true); // Show popup with full event list
            }}
          >
            +{hiddenEvents} more
          </div>
        )}
      </div>
    );
  };

  const renderEventListPopup = () => (
    <div className="popup-overlay" onClick={() => setShowEventList(false)}>
      <div className="event-list-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <span className="header-title">Events</span>
          <button className="close-btn" onClick={() => setShowEventList(false)}>×</button>
        </div>
        <div className="event-list">
          {selectedDayEvents.map((event) => (
            <div
              key={event.id}
              className="event-item"
              onClick={() => {
                setSelectedEventDetails(event);
                setShowEventList(false);
              }}
            >
              <div className="event-title">{event.title}</div>
              <div className="event-time">{event.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEventDetailsPopup = () => (
    <div className="popup-overlay" onClick={() => setSelectedEventDetails(null)}>
      <div className="event-details-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>{selectedEventDetails.title}</h2>
          <button className="close-btn" onClick={() => setSelectedEventDetails(null)}>×</button>
        </div>
        <div className="event-details">
          <p>Date: {selectedEventDetails.date}</p>
          <p>Time: {selectedEventDetails.time}</p>
          <p>Location: {selectedEventDetails.location || 'No location'}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="calendar">
        {/* Render calendar cells */}
        {/* Example: renderCalendarCell(day, events) */}
      </div>

      {/* Popups */}
      {showEventList && renderEventListPopup()}
      {selectedEventDetails && renderEventDetailsPopup()}

      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .event-list-popup,
        .event-details-popup {
          background: white;
          border-radius: 12px;
          width: 400px;
          max-width: 90vw;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .popup-header {
          padding: 16px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .event-list {
          padding: 16px;
        }

        .event-item {
          margin-bottom: 8px;
          cursor: pointer;
        }

        .event-title {
          font-weight: bold;
        }

        .event-time {
          font-size: 14px;
          color: gray;
        }
      `}</style>
    </>
  );
};

export default Calendar;
