import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


 
          
      const handleContextMenu = (e, date) => {
  e.preventDefault();
  setContextMenuPosition({ x: e.pageX, y: e.pageY });
  setShowContextMenu(true);
  setSelectedDate(date);
};

const handleDayDoubleClick = (date) => {
  setSelectedDate(date);
  setShowCreateEvent(true);
};

const handleCreateNewEvent = () => {
  setShowContextMenu(false);
  setShowCreateEvent(true);
};





<div
  key={index}
  className={`calendar-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
  onClick={() => setCurrentDate(day.date)}
  onContextMenu={(e) => handleContextMenu(e, day.date)} // Right-click handler
  onDoubleClick={() => handleDayDoubleClick(day.date)} // Double-click handler
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



{view === 'month' && (
  <div className="calendar-grid">
    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
      <div key={index} className="calendar-header-cell">
        {day}
      </div>
    ))}
    {getDaysInMonth(currentDate).map((day, index) => {
      const events = getEventsForDate(day.date);
      return (
        <div
          key={index}
          className={`calendar-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
          onContextMenu={(e) => handleContextMenu(e, day.date)}
          onDoubleClick={() => handleDayDoubleClick(day.date)}
        >
          <div className="date-label">{day.date.getDate()}</div>
          {/* Render Events */}
        </div>
      );
    })}
  </div>
)}

{view === 'week' && renderWeekView()}
{view === 'day' && renderDayView()}

{showCreateEvent && renderCreateEventPopup()}
{showContextMenu && renderContextMenu()}
{showEventList && renderEventListPopup()}
{selectedEventDetails && renderEventPopup()}

