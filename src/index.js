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
  setContextMenuPosition({ x: e.clientX, y: e.clientY });
  setShowContextMenu(true);
  setNewEvent(prev => ({
    ...prev,
    date: date
  }));
};

const handleCreateNewEvent = () => {
  setShowContextMenu(false);
  setShowCreateEvent(true);
};

const handleDayDoubleClick = (date) => {
  setNewEvent(prev => ({
    ...prev,
    date: date
  }));
  setShowCreateEvent(true);
};

const handleSaveNewEvent = () => {
  if (!newEvent.title.trim()) {
    alert('Event title is required');
    return;
  }

  const eventToAdd = {
    id: events.length + 1,
    title: newEvent.title,
    type: newEvent.allDay ? 'all-day' : 'timed',
    category: 'event',
    description: ''
  };

  if (newEvent.allDay) {
    eventToAdd.date = new Date(newEvent.date);
  } else {
    const [startHours, startMinutes] = newEvent.startTime.split(':');
    const [endHours, endMinutes] = newEvent.endTime.split(':');
    
    const startDate = new Date(newEvent.date);
    startDate.setHours(parseInt(startHours), parseInt(startMinutes));
    
    const endDate = new Date(newEvent.date);
    endDate.setHours(parseInt(endHours), parseInt(endMinutes));

    if (startDate >= endDate) {
      alert('End time must be after start time');
      return;
    }

    eventToAdd.startDate = startDate;
    eventToAdd.endDate = endDate;
  }

  setEvents(prev => [...prev, eventToAdd]);
  setShowCreateEvent(false);
  setNewEvent({
    title: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    allDay: false,
    type: 'timed'
  });
};

const renderCreateEventPopup = () => (
  showCreateEvent && (
    <div className="event-popup-overlay" onClick={() => setShowCreateEvent(false)}>
      <div className="event-popup" onClick={(e) => e.stopPropagation()}>
        <div className="event-popup-header">
          <h2>Create New Event</h2>
          <button className="close-button" onClick={() => setShowCreateEvent(false)}>×</button>
        </div>
        <div className="event-popup-content">
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              className="event-input"
              placeholder="Enter event name"
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={newEvent.allDay}
                onChange={(e) => setNewEvent(prev => ({ ...prev, allDay: e.target.checked }))}
              />
              All Day
            </label>
          </div>

          {!newEvent.allDay && (
            <>
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                  className="event-input"
                />
              </div>

              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                  className="event-input"
                />
              </div>
            </>
          )}

          <div className="event-popup-actions">
            <button className="cancel-button" onClick={() => setShowCreateEvent(false)}>
              Cancel
            </button>
            <button className="save-button" onClick={handleSaveNewEvent}>
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  )
);

const renderContextMenu = () => (
  showContextMenu && (
    <div 
      className="context-menu"
      style={{
        position: 'fixed',
        top: contextMenuPosition.y,
        left: contextMenuPosition.x,
        background: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderRadius: '4px',
        padding: '8px 0',
        zIndex: 1000
      }}
    >
      <div 
        className="context-menu-item"
        onClick={handleCreateNewEvent}
        style={{
          padding: '8px 16px',
          cursor: 'pointer'
        }}
      >
        Create New Event
      </div>
    </div>
  )
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
        );
      })}
    </div>
  )}

  {view === 'week' && renderWeekView()}
  {view === 'day' && renderDayView()}

  {showCreateEvent && renderCreateEventPopup()}
  {showContextMenu && renderContextMenu()}
</div>
               
