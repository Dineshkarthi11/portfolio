import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const renderEventListPopup = () => (
  <div className="popup-overlay" onClick={() => setShowEventList(false)}>
    <div className="event-list-popup" onClick={(e) => e.stopPropagation()}>
      <div className="popup-header">
        <span className="header-title">Events</span>
        <button className="close-btn" onClick={() => setShowEventList(false)}>×</button>
      </div>
      <div className="event-list">
        {selectedDayEvents.map((event) => (
          <div
            key={event.id}
            className="event-item"
            style={{
              backgroundColor: event.color || '#ffffff',
              color: getContrastColor(event.color || '#ffffff'),
              border: '1px solid #e0e0e0',
              padding: '8px',
              borderRadius: '16px',
              margin: '4px 0',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div
              className="event-title"
              onMouseEnter={(e) => {
                const hoverCard = e.currentTarget.nextElementSibling;
                if (hoverCard) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  hoverCard.style.display = 'block';
                  hoverCard.style.left = `${rect.left}px`;
                  hoverCard.style.top = `${rect.bottom + 5}px`;
                }
              }}
              onMouseLeave={(e) => {
                const hoverCard = e.currentTarget.nextElementSibling;
                if (hoverCard) {
                  hoverCard.style.display = 'none';
                }
              }}
            >
              {event.title}
            </div>
            <EventHoverCard 
              event={event}
              onEdit={() => {
                setEditedEvent(event);
                setIsEditing(true);
              }}
              onDelete={handleDeleteEvent}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EventHoverCard = ({ event, onEdit, onDelete }) => (
  <div className="event-hover-card">
    <h4>{event.title}</h4>
    <p><strong>Description:</strong> {event.description}</p>
    <p><strong>Date:</strong> {formatDate(event.date)}</p>
    <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
    <p><strong>Type:</strong> {event.type}</p>
    <div className="hover-card-actions">
      <button 
        className="edit-btn"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(event);
        }}
      >
        Edit
      </button>
      <button 
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(event.id);
        }}
      >
        Delete
      </button>
    </div>
  </div>
);



.event-hover-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  min-width: 220px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  display: none;
  z-index: 100;
  transition: opacity 0.2s ease-in-out;
}

.event-title {
  font-weight: bold;
  cursor: pointer;
  position: relative;
  display: inline-block;
}

.event-title:hover + .event-hover-card {
  display: block;
}

