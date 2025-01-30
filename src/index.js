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
            onClick={() => {
              setSelectedEventDetails(event);
              setShowEventList(false);
            }}
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
                const hoverCard = e.currentTarget.nextElementSibling.nextElementSibling;
                if (hoverCard) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  hoverCard.style.display = 'block';
                  hoverCard.style.left = `${rect.right + 10}px`;
                  hoverCard.style.top = `${rect.top}px`;
                }
              }}
              onMouseLeave={(e) => {
                const hoverCard = e.currentTarget.nextElementSibling.nextElementSibling;
                if (hoverCard) {
                  hoverCard.style.display = 'none';
                }
              }}
            >
              {event.title}
            </div>
            <div className="event-time">{event.time}</div>
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


.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

const EventHoverCard = ({ event, onEdit, onDelete }) => (
  <div className="event-hover-card">
    <h4>{event.title}</h4>
    <p>Description: {event.description}</p>
    <p>Date: {formatDate(event.date)}</p>
    <p>Time: {event.startTime}</p>
    <p>Type: {event.type}</p>
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
  width: 300px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 
    0 4px 24px -1px rgba(0, 0, 0, 0.1),
    0 1px 8px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.5) inset;
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 50; 
  animation: slideIn 0.2s ease-out;
}

.event-hover-card {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  min-width: 200px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: none;
}

.event:hover + .event-hover-card,
.event-hover-card:hover {
  display: block;
}
