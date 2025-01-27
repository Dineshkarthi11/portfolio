import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




import React from 'react';

const CalendarPopups = () => {
  const renderEventListPopup = () => (
    <div className="popup-overlay" onClick={() => setShowEventList(false)}>
      <div className="event-list-popup" onClick={e => e.stopPropagation()}>
        <div className="popup-header">
          <div className="date-info">
            <span className="day">Sunday, Oct 11</span>
            <button className="close-btn" onClick={() => setShowEventList(false)}>×</button>
          </div>
        </div>
        <div className="event-list">
          {selectedDayEvents.map(event => (
            <div 
              key={event.id} 
              className="event-item"
              onClick={() => {
                setSelectedEventDetails(event);
                setShowEventList(false);
              }}
            >
              <div className="event-tag" style={{ backgroundColor: '#34C759' }}>
                {event.title}
              </div>
              <div className="event-details">
                <div className="event-time">
                  {formatEventTime(event)}
                </div>
                <div className="event-location">
                  {event.location || 'No location'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEventDetailsPopup = () => (
    <div className="popup-overlay" onClick={() => setSelectedEventDetails(null)}>
      <div className="event-details-popup" onClick={e => e.stopPropagation()}>
        <div className="popup-header">
          <div className="header-content">
            <div className="title-section">
              <h2>{selectedEventDetails.title}</h2>
              <button className="close-btn" onClick={() => setSelectedEventDetails(null)}>×</button>
            </div>
            <div className="date-section">
              <span className="date-range">
                {formatDate(selectedEventDetails.date, { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
              <span className="duration">1 week, 1 day</span>
            </div>
          </div>
        </div>
        <div className="event-content">
          <div className="event-actions">
            <button className="edit-btn">
              <span className="icon">✎</span>
              Edit
            </button>
            <button className="delete-btn">
              <span className="icon">🗑</span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
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
          background: #f8f9fa;
        }

        .date-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .day {
          font-size: 16px;
          font-weight: 500;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .close-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .event-list {
          max-height: 70vh;
          overflow-y: auto;
          padding: 8px;
        }

        .event-item {
          padding: 12px;
          cursor: pointer;
          border-radius: 8px;
          transition: background-color 0.2s;
        }

        .event-item:hover {
          background-color: #f5f5f5;
        }

        .event-tag {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          color: white;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .event-details {
          padding-left: 8px;
        }

        .event-time {
          font-size: 14px;
          color: #666;
          margin-bottom: 4px;
        }

        .event-location {
          font-size: 14px;
          color: #999;
        }

        .title-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .title-section h2 {
          margin: 0;
          font-size: 20px;
        }

        .date-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: #666;
        }

        .event-actions {
          display: flex;
          gap: 12px;
          padding: 16px;
        }

        .edit-btn,
        .delete-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .edit-btn {
          background: #f0f0f0;
          color: #333;
        }

        .delete-btn {
          background: #ffebee;
          color: #d32f2f;
        }

        .edit-btn:hover {
          background: #e0e0e0;
        }

        .delete-btn:hover {
          background: #ffe0e0;
        }
      `}</style>
    </>
  );
};

export default CalendarPopups;





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
