import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

<div className="calendar-body">
        {view === 'month' && (
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index} className="calendar-header-cell">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentDate).map((day, index) => (
              <div
                key={index}
                className={`calendar-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
                onClick={() => setCurrentDate(day.date)}
              >
                <div className="date-label">{day.date.getDate()}</div>
                {getEventsForDate(day.date).map(event => (
                  <div
                    key={event.id}
                    className={`event ${event.type}`}
                    onClick={() => setSelectedEventDetails(event)}
                  >
                    <span style={{ marginRight: '4px' }}>
                      {event.type === 'long'
                        ? `${formatDate(event.startDate, {
                            hour: '2-digit',
                            minute: '2-digit',
                          })} - ${formatDate(event.endDate, {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}`
                        : formatDate(event.date, { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>

      {showCreateEvent && renderCreateEventPopup()}
      {showEventList && renderEventListPopup()}
      {showContextMenu && renderContextMenu()}

      {selectedEventDetails && renderEventPopup()}
    </div>
