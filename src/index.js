import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const renderDayView = () => {
  const eventsForDay = getEventsForDay(currentDate);
  return (
    <div className="day-view-container">
      <div className="day-header">
        {formatDate(currentDate, { weekday: 'short', day: 'numeric' })}
      </div>
      <div className="day-content">
        <div className="hours-column">
          {[...Array(12)].map((_, hour) => (
            <div key={hour} className="hour-label">
              {hour === 0 ? 12 : hour}:00 AM
            </div>
          ))}
          {[...Array(12)].map((_, hour) => (
            <div key={hour + 12} className="hour-label">
              {hour === 0 ? 12 : hour}:00 PM
            </div>
          ))}
        </div>
        <div className="events-column">
          {[...Array(12)].map((_, hour) => (
            <div key={hour} className="hour-cell">
              {eventsForDay
                .filter(event => {
                  const eventHour = event.type === 'long' 
                    ? event.startDate.getHours() 
                    : event.date.getHours();
                  return eventHour === hour;
                })
                .map(event => (
                  <div 
                    key={event.id} 
                    className={`event ${event.type}`} 
                    onClick={() => setSelectedEventDetails(event)}
                  >
                    <span style={{ marginRight: '4px' }}>
                      {formatDate(event.date || event.startDate, { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                    {event.title}
                  </div>
                ))
              }
            </div>
          ))}
          {[...Array(12)].map((_, hour) => (
            <div key={hour + 12} className="hour-cell">
              {eventsForDay
                .filter(event => {
                  const eventHour = event.type === 'long' 
                    ? event.startDate.getHours() 
                    : event.date.getHours();
                  return eventHour === hour + 12;
                })
                .map(event => (
                  <div 
                    key={event.id} 
                    className={`event ${event.type}`} 
                    onClick={() => setSelectedEventDetails(event)}
                  >
                    <span style={{ marginRight: '4px' }}>
                      {formatDate(event.date || event.startDate, { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                    {event.title}
                  </div>
                ))
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
