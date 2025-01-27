import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


 const handleSaveNewEvent = () => {
    if (!newEvent.title.trim()) {
      alert('Event title is required');
      return;
    }

    const eventToAdd = {
      id: Date.now(),
      title: newEvent.title,
      type: newEvent.allDay ? 'all-day' : 'timed',
      category: 'event',
      description: '',
      calendar: newEvent.calendar,
      repeat: newEvent.repeat
    };

    if (newEvent.allDay) {
      eventToAdd.date = new Date(newEvent.date);
    } else {
      if (!newEvent.startTime || !newEvent.endTime) {
        alert('Please select both start and end times');
        return;
      }

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

      eventToAdd.date = startDate;
      eventToAdd.startDate = startDate;
      eventToAdd.endDate = endDate;
    }

    setEvents(prevEvents => [...prevEvents, eventToAdd]);
    setShowCreateEvent(false);
    setNewEvent({
      title: '',
      date: new Date(),
      startTime: '',
      endTime: '',
      allDay: false,
      type: 'timed',
      calendar: 'default',
      repeat: 'none'
    });
  };

  
     const renderCreateEventPopup = () => (
  <div
    className="event-popup-overlay"
    onClick={() => setShowCreateEvent(false)} // Close the popup on backdrop click
  >
    <div
      className="event-popup event-create-popup"
      onClick={(e) => e.stopPropagation()} // Prevent backdrop click from propagating
    >
      <div className="event-popup-header">
        <h2>Edit</h2>
        <button className="close-button" onClick={() => setShowCreateEvent(false)}>×</button>
      </div>
      <div className="event-popup-content">
        <div className="form-group">
          <label>NAME</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
            className="event-input"
            placeholder="New event"
          />
        </div>

        <div className="form-group">
          <label>CALENDAR</label>
          <select 
            className="event-select"
            value={newEvent.calendar}
            onChange={(e) => setNewEvent(prev => ({ ...prev, calendar: e.target.value }))}
          >
            <option value="default">Bryntum team</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={newEvent.allDay}
              onChange={(e) => setNewEvent(prev => ({ ...prev, allDay: e.target.checked }))}
            />
            ALL DAY
          </label>
        </div>

        <div className="form-group date-time-group">
          <label>START</label>
          <div className="date-time-inputs">
            <input
              type="date"
              value={newEvent.date.toISOString().split('T')[0]}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                setNewEvent(prev => ({ ...prev, date: newDate }));
              }}
              className="date-input"
            />
            {!newEvent.allDay && (
              <input
                type="time"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                className="time-input"
              />
            )}
          </div>
        </div>

        <div className="form-group date-time-group">
          <label>END</label>
          <div className="date-time-inputs">
            <input
              type="date"
              value={newEvent.date.toISOString().split('T')[0]}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                setNewEvent(prev => ({ ...prev, date: newDate }));
              }}
              className="date-input"
            />
            {!newEvent.allDay && (
              <input
                type="time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                className="time-input"
              />
            )}
          </div>
        </div>

        <div className="form-group">
          <label>REPEAT</label>
          <select 
            className="event-select"
            value={newEvent.repeat}
            onChange={(e) => setNewEvent(prev => ({ ...prev, repeat: e.target.value }))}
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="event-popup-actions">
          <button className="cancel-button" onClick={() => setShowCreateEvent(false)}>
            CANCEL
          </button>
          <button className="save-button" onClick={handleSaveNewEvent}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  </div>
);

  const renderEventListPopup = () => (
    <div className="event-popup-overlay">
      <div className="event-popup">
        <div className="event-popup-header">
          <h2>Events for {selectedDayEvents[0]?.date.toLocaleDateString()}</h2>
          <button className="close-button" onClick={() => setShowEventList(false)}>×</button>
        </div>
        <div className="event-popup-content">
          {selectedDayEvents.map(event => (
            <div key={event.id} className="event-list-item">
              <div className="event-time">
                {event.type === 'all-day' 
                  ? 'All Day'
                  : formatDate(event.date || event.startDate, { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}
              </div>
              <div className="event-title">{event.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
  {showEventList && renderEventListPopup()}
  {showContextMenu && renderContextMenu()}
  {selectedEventDetails && renderEventPopup()}
</div>
    </div>
  );
};
