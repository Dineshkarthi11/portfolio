import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


const renderCreateEventPopup = () => (
  <div className="event-popup-overlay">
    <div className="event-popup event-create-popup">
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
