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
      {getDaysInMonth(currentDate).map((day, index) => {
        const events = getEventsForDate(day.date);
        const MAX_VISIBLE_EVENTS = 1;
        const hiddenEventsCount = events.length > MAX_VISIBLE_EVENTS ? events.length - MAX_VISIBLE_EVENTS : 0;

        const getContrastColor = (backgroundColor) => {
          if (!backgroundColor) return '#000000';
          const hex = backgroundColor.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          return luminance > 0.5 ? '#000000' : '#ffffff';
        };

        return (
          <div
            key={index}
            className={`calendar-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
            onClick={() => setCurrentDate(day.date)}
            onContextMenu={(e) => handleContextMenu(e, day.date)}
            onDoubleClick={() => handleDayDoubleClick(day.date)}
          >
            <div className="date-label">{day.date.getDate()}</div>
            
            {events.slice(0, MAX_VISIBLE_EVENTS).map(event => (
              <div className="event-container" key={event.id}>
                <div
                  className={`event ${event.type}`}
                  style={{
                    backgroundColor: event.color || '#ffffff',
                    color: getContrastColor(event.color),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEventDetails(event);
                  }}
                >
                  {event.title}
                </div>
                <EventHoverCard 
                  event={event}
                  style={{
                    backgroundColor: event.color || '#ffffff',
                    color: getContrastColor(event.color),
                  }}
                  onEdit={() => {
                    setEditedEvent(event);
                    setIsEditing(true);
                  }}
                  onDelete={handleDeleteEvent}
                />
              </div>
            ))}

            {hiddenEventsCount > 0 && (
              <div
                className="more-events"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDayEvents(events);
                  setShowEventList(true);
                }}
              >
                +{hiddenEventsCount} more
              </div>
            )}
          </div>
        );
      })}
    </div>
  )}

  {view === 'week' && renderWeekView()}
  {view === 'day' && renderDayView()}

  {showCreateEvent && renderCreateEventPopup()}
  {showEventList && renderEventListPopup()}
  {showContextMenu && renderContextMenu()}
  {selectedEventDetails && renderEventPopup()}
</div>
