import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


const renderEventPopup = () => (
  <div className="event-popup-overlay">
    <div className="event-popup" ref={eventPopupRef}>
      <div className="event-popup-header">
        <h2>{isEditing ? 'Edit Event' : 'Event Details'}</h2>
        <button
          className="close-button"
          onClick={() => {
            setSelectedEventDetails(null);
            setIsEditing(false);
            setEditedEvent(null);
          }}
        >
          ×
        </button>
      </div>
      <div className="event-popup-content">
        <div className="form-group">
          <label>Event Name</label>
          {isEditing ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                value={editedEvent?.title || ""}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, title: e.target.value })
                }
                className="event-input"
                placeholder="Enter event name"
                style={{
                  backgroundColor: editedEvent?.color || "#ffffff",
                  color: "#000",
                  flex: 1,
                }}
              />
              <input
                type="color"
                value={editedEvent?.color || "#000000"}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, color: e.target.value })
                }
                className="event-color-picker"
                style={{ marginLeft: "10px" }}
              />
            </div>
          ) : (
            <input
              type="text"
              value={selectedEventDetails?.title || ""}
              className="event-input"
              style={{
                backgroundColor: selectedEventDetails?.color || "#ffffff",
                color: "#000",
              }}
              readOnly
            />
          )}
        </div>

        <div className="form-group">
          <label>Repeat</label>
          {isEditing ? (
            <select
              className="event-select"
              value={newEvent.repeat}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, repeat: e.target.value }))
              }
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          ) : (
            <select
              className="event-select"
              value={selectedEventDetails?.category || ""}
              disabled
            >
              <option value="">Select category</option>
              <option value="meeting">Meeting</option>
              <option value="event">Event</option>
              <option value="task">Task</option>
            </select>
          )}
        </div>

        <div className="event-popup-actions">
          {isEditing ? (
            <>
              <button className="cancel-button" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="save-button" onClick={handleSaveEdit}>
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                className="cancel-button"
                onClick={() => setSelectedEventDetails(null)}
              >
                Cancel
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteEvent(selectedEventDetails.id)}
              >
                Delete
              </button>
              <button className="edit-button" onClick={handleEditEvent}>
                Edit Event
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);






const renderWeekView = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    const endOfWeek = cloneDate(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const eventsForWeek = getEventsForWeek(startOfWeek);
  
    const formatWeekRange = (start, end) => {
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', options)}`;
    };
  
    const renderHourCell = (date, hour) => {
      const hourEvents = eventsForWeek.filter(event => {
        const eventDate = event.date || event.startDate;
        return eventDate.getHours() === hour && 
               eventDate.toDateString() === date.toDateString();
      });
  
      const MAX_VISIBLE_EVENTS = 1;
      const hiddenEvents = hourEvents.length > MAX_VISIBLE_EVENTS ? hourEvents.length - MAX_VISIBLE_EVENTS : 0;
  
      return (
        <div 
          className="calendar-cell"
          onContextMenu={(e) => handleContextMenu(e, date)}
          onDoubleClick={() => handleDayDoubleClick(date)}
        >
          {hourEvents.slice(0, MAX_VISIBLE_EVENTS).map(event => (
            <div 
              key={event.id} 
              className={`event ${event.type}`} 
              onClick={() => setSelectedEventDetails(event)}
            >
              {event.title}
            </div>
          ))}
          {hiddenEvents > 0 && (
            <div 
              className="more-events"
              onClick={() => {
                setSelectedDayEvents(hourEvents);
                setShowEventList(true);
              }}
            >
              +{hiddenEvents} more
            </div>
          )}
        </div>
      );
    };
  
    return (
      <div className="week-view-container">
        <div className="week-header" style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center', 
          marginBottom: '15px',
          marginLeft: "35%"
        }}>
          <h2>{formatWeekRange(startOfWeek, endOfWeek)}</h2>
        </div>
        <div className="calendar-grid" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
          <div className="calendar-header-cell">Time</div>
          {[0, 1, 2, 3, 4, 5, 6].map(index => {
            const date = cloneDate(startOfWeek);
            date.setDate(startOfWeek.getDate() + index);
            return (
              <div key={index} className="calendar-header-cell">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]} {date.getDate()}
              </div>
            );
          })}
          
          {[...Array(24)].map((_, hour) => (
            <React.Fragment key={hour}>
              <div className="calendar-header-cell">
                {hour === 0 ? '12:00 AM' : 
                 hour < 12 ? `${hour}:00 AM` : 
                 hour === 12 ? '12:00 PM' : 
                 `${hour - 12}:00 PM`}
              </div>
              {[0, 1, 2, 3, 4, 5, 6].map(index => {
                const date = cloneDate(startOfWeek);
                date.setDate(startOfWeek.getDate() + index);
                date.setHours(hour);
                return renderHourCell(date, hour);
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
