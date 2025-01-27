import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


 
          
      const [showSecondPopup, setShowSecondPopup] = useState(false);


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
        onClick={() => {
          setShowCreateEvent(true);
          setShowSecondPopup(false); // Reset second popup state
        }}
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



const renderCreateEventPopup = () => (
  showCreateEvent && (
    <div
      className="event-popup-overlay"
      onClick={() => {
        setShowCreateEvent(false);
        setShowSecondPopup(false);
      }}
    >
      <div
        className="event-popup event-create-popup"
        onClick={(e) => {
          e.stopPropagation();
          setShowSecondPopup(true); // Open the second popup
        }}
      >
        <div className="event-popup-header">
          <h2>Create New Event</h2>
          <button className="close-button" onClick={() => setShowCreateEvent(false)}>×</button>
        </div>
        <div className="event-popup-content">
          <p>Click to open the second popup</p>
        </div>
      </div>
    </div>
  )
);




const renderSecondEventPopup = () => (
  showSecondPopup && (
    <div
      className="event-popup-overlay"
      onClick={() => setShowSecondPopup(false)}
    >
      <div
        className="event-popup event-create-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="event-popup-header">
          <h2>Second Popup</h2>
          <button className="close-button" onClick={() => setShowSecondPopup(false)}>×</button>
        </div>
        <div className="event-popup-content">
          <p>This is the second event popup!</p>
        </div>
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
  {showSecondPopup && renderSecondEventPopup()} {/* Include second popup */}
  {showEventList && renderEventListPopup()}
  {showContextMenu && renderContextMenu()}
  {selectedEventDetails && renderEventPopup()}
</div>





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

const handleContextMenu = (e, date) => {
  e.preventDefault();
  setContextMenuPosition({ x: e.clientX, y: e.clientY });
  setShowContextMenu(true);
  setNewEvent(prev => ({
    ...prev,
    date: date
  }));
};
