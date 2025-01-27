import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);





 {[...Array(24)].map((_, hour) => (
            <React.Fragment key={hour}>
              <div className="calendar-header-cell">{hour}:00 Am</div>
              {[0, 1, 2, 3, 4, 5, 6].map(index => {
                const date = cloneDate(startOfWeek);
                date.setDate(startOfWeek.getDate() + index);
                date.setHours(hour, 0, 0, 0);
                
                const hourEvents = eventsForWeek.filter(event => {
                  if (event.type === 'long') {
                    return date >= event.startDate && date <= event.endDate;
                  }
                  return event.date.getHours() === hour && 
                         event.date.toDateString() === date.toDateString();
                });
                
                return (
                  <div key={index} className="calendar-cell">
                    {hourEvents.map(event => (
                      <div 
                        key={event.id} 
                        className={`event ${event.type}`} 
                        onClick={() => setSelectedEventDetails(event)}
                      >
                        <span style={{ marginRight: '4px' }}>
                          {formatDate(event.date || event.startDate, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
