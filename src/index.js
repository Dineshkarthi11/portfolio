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
  selectedEventDetails && (
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
                value={editedEvent?.repeat || "none"}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, repeat: e.target.value })
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

          {/* Description Section */}
          <div className="form-group">
            <label>Description</label>
            {isEditing ? (
              <textarea
                className="event-textarea"
                value={editedEvent?.description || ""}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, description: e.target.value })
                }
                placeholder="Enter event description"
              />
            ) : (
              <textarea
                className="event-textarea"
                value={selectedEventDetails?.description || "No description available"}
                readOnly
              />
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
  )
);
