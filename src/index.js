import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const renderCalendarCell = (day, events) => {
  const MAX_VISIBLE_EVENTS = 1;  // Show only 1 event initially
  const hiddenEvents = events.length > MAX_VISIBLE_EVENTS ? events.length - MAX_VISIBLE_EVENTS : 0;

  return (
    <div
      className={`calendar-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
      onClick={() => setCurrentDate(day.date)}
      onContextMenu={(e) => handleContextMenu(e, day.date)}
      onDoubleClick={() => handleDayDoubleClick(day.date)}
    >
      <div className="date-label">{day.date.getDate()}</div>
      {events.slice(0, MAX_VISIBLE_EVENTS).map(event => (
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
            setShowEventList(true);  // Show popup with full event list
          }}
        >
          +{hiddenEvents} more
        </div>
      )}
    </div>
  );
};
