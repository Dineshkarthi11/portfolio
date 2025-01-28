import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


import React, { useState, useRef, useEffect } from 'react';

const CalendarEventsPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [showYearSelect, setShowYearSelect] = useState(false);
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    allDay: false,
    type: 'timed'
  });
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);
  
  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: 'New Year Celebration', 
      date: new Date(2025, 0, 1, 0, 0), 
      type: 'all-day', 
      description: 'Welcome the New Year!',
      category: 'event'
    },
    { 
      id: 2, 
      title: 'New Year Celebration', 
      date: new Date(2025, 0, 1, 0, 0), 
      type: 'all-day', 
      description: 'Welcome the New Year!',
      category: 'event'
    },
    { 
      id: 3, 
      title: 'New Year Celebration', 
      date: new Date(2025, 0, 1, 0, 0), 
      type: 'all-day', 
      description: 'Welcome the New Year!',
      category: 'event'
    },
    { 
      id: 4, 
      title: 'New Year Celebration', 
      date: new Date(2025, 0, 1, 0, 0), 
      type: 'all-day', 
      description: 'Welcome the New Year!',
      category: 'event'
    },
    { 
      id: 5, 
      title: 'Company Retreat', 
      startDate: new Date(2025, 0, 17, 9, 0), 
      endDate: new Date(2025, 0, 19, 17, 0), 
      type: 'long', 
      description: 'Annual team building event',
      category: 'event'
    },
    { 
      id: 6, 
      title: 'Team Meeting', 
      date: new Date(2025, 0, 22, 18, 30), 
      type: 'timed', 
      description: 'Quarterly team sync',
      category: 'meeting'
    },
    { 
      id: 7, 
      title: 'Birthday Party', 
      date: new Date(2025, 0, 24, 3, 0), 
      type: 'timed', 
      description: 'Surprise birthday celebration',
      category: 'event'
    }
  ]);
  const [editedEvent, setEditedEvent] = useState(null);
  
  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const eventPopupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showContextMenu) {
        setShowContextMenu(false);
      }
      if (eventPopupRef.current && !eventPopupRef.current.contains(event.target)) {
        setSelectedEventDetails(null);
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
        setShowMonthSelect(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setShowYearSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showContextMenu]);

  const formatDate = (date, options = {}) => {
    const defaultOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(date);
  };

  const cloneDate = (date) => {
    return new Date(date.getTime());
  };

  const navigateMonth = (direction) => {
    const newDate = cloneDate(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction) => {
    const newDate = cloneDate(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = cloneDate(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const years = Array.from({ length: 21 }, (_, i) => currentDate.getFullYear() - 10 + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDeleteEvent = (eventId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      setSelectedEventDetails(null);
    }
  };

  const handleEditEvent = () => {
    setIsEditing(true);
    setEditedEvent({
      ...selectedEventDetails,
      title: selectedEventDetails.title,
      category: selectedEventDetails.category || ''
    });
  };

  const handleSaveEdit = () => {
    if (!editedEvent.title.trim()) {
      alert('Event name cannot be empty');
      return;
    }

    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === editedEvent.id ? { ...event, ...editedEvent } : event
      )
    );
    setSelectedEventDetails({ ...selectedEventDetails, ...editedEvent });
    setIsEditing(false);
    setEditedEvent(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedEvent(null);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({ date: prevDate, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ 
        date: new Date(year, month, i),
        isCurrentMonth: true 
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const getStartOfWeek = (date) => {
    const startOfWeek = cloneDate(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek;
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      if (event.type === 'long') {
        return date >= event.startDate && date <= event.endDate;
      }
      return event.date.toDateString() === date.toDateString();
    });
  };

  const getEventsForWeek = (startOfWeek) => {
    const endOfWeek = cloneDate(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return events.filter(event => {
      if (event.type === 'long') {
        return (
          (event.startDate >= startOfWeek && event.startDate <= endOfWeek) ||
          (event.endDate >= startOfWeek && event.endDate <= endOfWeek) ||
          (event.startDate <= startOfWeek && event.endDate >= endOfWeek)
        );
      }
      const eventDate = event.date || event.startDate;
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });
  };

  const getEventsForDay = (date) => {
    return events.filter(event => {
      if (event.type === 'long') {
        return date >= event.startDate && date <= event.endDate;
      }
      const eventDate = event.date || event.startDate;
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const handleYearChange = (year) => {
    const newDate = cloneDate(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearSelect(false);
  };

  const handleMonthChange = (monthIndex) => {
    const newDate = cloneDate(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setShowMonthSelect(false);
  };

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
              <input 
                type="text" 
                value={editedEvent?.title || ''} 
                onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                className="event-input"
                placeholder="Enter event name"
              />
            ) : (
              <input 
                type="text" 
                value={selectedEventDetails?.title || ''} 
                className="event-input"
                readOnly
              />
            )}
          </div>
          
          <div className="form-group">
            <label>Category</label>
            {isEditing ? (
              <select 
                className="event-select"
                value={editedEvent?.category || ''}
                onChange={(e) => setEditedEvent({ ...editedEvent, category: e.target.value })}
              >
                <option value="">Select category</option>
                <option value="meeting">Meeting</option>
                <option value="event">Event</option>
                <option value="task">Task</option>
              </select>
            ) : (
              <select 
                className="event-select" 
                value={selectedEventDetails?.category || ''} 
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
                <button className="cancel-button" onClick={() => setSelectedEventDetails(null)}>
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

  const renderDayView = () => {
    const eventsForDay = getEventsForDay(currentDate);
    return (
      <div
       className="day-view-container"
       onContextMenu={(e) => handleContextMenu(e, currentDate)}
       onDoubleClick={() => handleDayDoubleClick(currentDate)}
       >
        <div className="day-header">
          {formatDate(currentDate, { weekday: 'short', day: 'numeric' })}
        </div>
        <div className="day-content">
          <div className="hours-column">
            {[...Array(24)].map((_, hour) => {
            const date = cloneDate(currentDate);
            date.setHours(hour);
            
            const hourEvents = eventsForDay.filter(event => {
              const eventDate = event.date || event.startDate;
              return eventDate.getHours() === hour;
            });

            return (
              <div key={hour} className="hour-cell">
                <div className="hour-label">
                  {hour === 0 ? '12:00 AM' : hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`}
                </div>
              </div>
            );
          })}
          </div>
          <div className="events-column">
            {[...Array(12)].map((_, hour) => (
              <div key={hour} className="hour-cell">
                {eventsForDay
                  .filter(event => {
                    const eventHour = event.type === 'long' 
                      ? event.startDate.getHours() 
                      : event.date.getHours();
                    return eventHour === hour;
                  })
                  .map(event => (
                    <div 
                      key={event.id} 
                      className={`event ${event.type}`} 
                      onClick={() => setSelectedEventDetails(event)}
                    >
                      <span style={{ marginRight: '4px' }}>
                        {formatDate(event.date || event.startDate, { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </span>
                      {event.title}
                    </div>
                  ))
                }
              </div>
            ))}
            {[...Array(12)].map((_, hour) => (
              <div key={hour + 12} className="hour-cell">
                {eventsForDay
                  .filter(event => {
                    const eventHour = event.type === 'long' 
                      ? event.startDate.getHours() 
                      : event.date.getHours();
                    return eventHour === hour + 12;
                  })
                  .map(event => (
                    <div 
                      key={event.id} 
                      className={`event ${event.type}`} 
                      onClick={() => setSelectedEventDetails(event)}
                    >
                      <span style={{ marginRight: '4px' }}>
                        {formatDate(event.date || event.startDate, { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </span>
                      {event.title}
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        </div>
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

    const handleCreateNewEvent = () => {
  setShowContextMenu(false); // Close the context menu
  setNewEvent(prev => ({    // Reset the newEvent state with default values
    ...prev,
    title: '',
    startTime: '',
    endTime: '',
    allDay: false,
    type: 'timed',
    calendar: 'default',
    repeat: 'none'
  }));
  setShowCreateEvent(true); // Show the create event popup
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
            >
              <div className="event-title">{event.title}</div>
              <div className="event-time">{event.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEventDetailsPopup = () => (
    <div className="popup-overlay" onClick={() => setSelectedEventDetails(null)}>
      <div className="event-details-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>{selectedEventDetails.title}</h2>
          <button className="close-btn" onClick={() => setSelectedEventDetails(null)}>×</button>
        </div>
        <div className="event-details">
          <p>Date: {selectedEventDetails.date}</p>
          <p>Time: {selectedEventDetails.time}</p>
          <p>Location: {selectedEventDetails.location || 'No location'}</p>
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


  // Modified calendar cell render function
     const renderCalendarCell = (day, events) => {
    const MAX_VISIBLE_EVENTS = 1; // Show only 1 event initially
    const hiddenEvents = events.length > MAX_VISIBLE_EVENTS ? events.length - MAX_VISIBLE_EVENTS : 0;

    return (
      <div
        className={`calendar-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
        onClick={() => setSelectedDayEvents(events)} // Set events for the day
        onDoubleClick={() => console.log('Day double-clicked:', day.date)}
      >
        <div className="date-label">{day.date.getDate()}</div>
        {events.slice(0, MAX_VISIBLE_EVENTS).map((event) => (
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
              setShowEventList(true); // Show popup with full event list
            }}
          >
            +{hiddenEvents} more
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-container" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: "Lexend Deca",
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      background: '#fff',
      padding: '20px',
      height: '90vh', // Set a fixed height for the container
      display: 'flex',
      flexDirection: 'column'
    }}>
      <style>
        {`
          .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 50px;
            flex-wrap: wrap;
            flex-shrink: 0;
           }
        `}
      </style>

      <div className="calendar-header">
      <div className="nav-buttons">
          {view === 'month' && (
            <>
              <button onClick={() => navigateMonth(-1)}>←</button>
              <button onClick={() => navigateMonth(1)}>→</button>
              <button style={{marginLeft:"8px"}} onClick={goToToday}>Today</button>
            </>
          )}
          {view === 'week' && (
            <>
              <button onClick={() => navigateWeek(-1)}>←</button>
              <button onClick={() => navigateWeek(1)}>→</button>
              <button style={{marginLeft:"8px"}} onClick={goToToday}>Today</button>
            </>
          )}
          {view === 'day' && (
            <>
              <button onClick={() => navigateDay(-1)}>←</button>
              <button onClick={() => navigateDay(1)}>→</button>
              <button style={{marginLeft:"8px"}} onClick={goToToday}>Today</button>
            </>
          )}
        </div>
        

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} >
          <button onClick={() => setShowYearSelect(!showYearSelect)}>
            {currentDate.getFullYear()}
          </button>
          <button onClick={() => setShowMonthSelect(!showMonthSelect)}>
            {months[currentDate.getMonth()]}
          </button>

          {showYearSelect && (
            <div className="dropdown-column" ref={yearDropdownRef}>
              {years.map(year => (
                <div key={year} className="dropdown-item" onClick={() => handleYearChange(year)}>
                  {year}
                </div>
              ))}
            </div>
          )}

          {showMonthSelect && (
            <div className="dropdown-column" ref={monthDropdownRef}>
              {months.map((month, index) => (
                <div key={month} className="dropdown-item" onClick={() => handleMonthChange(index)}>
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="view-buttons">
          <button 
            className={view === 'month' ? 'active' : ''} 
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button 
            className={view === 'week' ? 'active' : ''} 
            onClick={() => {
              setView('week');
              setCurrentDate(getStartOfWeek(currentDate));
            }}
          >
            Week
          </button>
          <button 
            className={view === 'day' ? 'active' : ''} 
              onClick={() => setView('day')}
              >
                Day
              </button>
            </div>
          </div>

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

export default CalendarEventsPage;

