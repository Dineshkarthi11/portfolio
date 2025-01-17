import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




import React, { useState } from "react";

const Calendar = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const [events, setEvents] = useState([]);

  const addEvent = (day, time) => {
    const title = prompt("Enter event title:");
    if (title) {
      const duration = prompt("Enter event duration (in hours):");
      if (duration) {
        setEvents([
          ...events,
          { id: Date.now(), title, day, time, duration: `${duration} hrs` },
        ]);
      }
    }
  };

  const removeEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const styles = {
    calendar: {
      display: "flex",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif",
    },
    dayHeader: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      backgroundColor: "#f1f3f4",
      padding: "10px",
    },
    day: {
      textAlign: "center",
      fontWeight: "bold",
      padding: "5px",
    },
    calendarBody: {
      display: "flex",
      flexDirection: "row",
    },
    timeColumn: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#e8eaed",
      padding: "5px",
    },
    timeSlot: {
      height: "50px",
      textAlign: "center",
      lineHeight: "50px",
      borderBottom: "1px solid #ccc",
    },
    dayColumns: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      flexGrow: 1,
    },
    dayColumn: {
      display: "flex",
      flexDirection: "column",
      borderLeft: "1px solid #ccc",
    },
    slot: {
      height: "50px",
      borderBottom: "1px solid #ccc",
      position: "relative",
      cursor: "pointer",
    },
    slotHover: {
      backgroundColor: "#f1f3f4",
    },
    eventCard: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      backgroundColor: "#4285f4",
      color: "white",
      borderRadius: "5px",
      padding: "5px",
      fontSize: "12px",
      cursor: "pointer",
    },
    eventCardTitle: {
      margin: "0",
      fontSize: "14px",
    },
    eventCardDetails: {
      margin: "0",
      fontSize: "12px",
    },
  };

  return (
    <div style={styles.calendar}>
      {/* Day Header */}
      <div style={styles.dayHeader}>
        {days.map((day, index) => (
          <div style={styles.day} key={index}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div style={styles.calendarBody}>
        {/* Time Slots Column */}
        <div style={styles.timeColumn}>
          {timeSlots.map((time, index) => (
            <div style={styles.timeSlot} key={index}>
              {time}
            </div>
          ))}
        </div>

        {/* Days Columns */}
        <div style={styles.dayColumns}>
          {days.map((_, dayIndex) => (
            <div style={styles.dayColumn} key={dayIndex}>
              {timeSlots.map((time, timeIndex) => (
                <div
                  key={`${dayIndex}-${timeIndex}`}
                  style={styles.slot}
                  onClick={() => addEvent(dayIndex, time)}
                >
                  {events
                    .filter((event) => event.day === dayIndex && event.time === time)
                    .map((event) => (
                      <div
                        key={event.id}
                        style={styles.eventCard}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeEvent(event.id);
                        }}
                      >
                        <h4 style={styles.eventCardTitle}>{event.title}</h4>
                        <p style={styles.eventCardDetails}>
                          {`${event.time} (${event.duration})`}
                        </p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;








import React, { useState, useRef, useEffect } from 'react';
import { Settings, ChevronLeft, ChevronRight, Users, Video, Coffee, Book, Briefcase, Zap, Mic, X, MapPin, Clock, Calendar, User } from 'lucide-react';

// Utility functions and constants
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

const getEventColors = (type) => {
  const colors = {
    meeting: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700'
    },
    workshop: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700'
    },
    social: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700'
    },
    presentation: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700'
    }
  };
  return colors[type] || colors.meeting;
};

const getEventStyle = (event) => {
  const startHour = event.start.getHours() + event.start.getMinutes() / 60;
  const endHour = event.end.getHours() + event.end.getMinutes() / 60;
  const duration = endHour - startHour;
  
  return {
    top: `${(startHour - 9) * 60}px`,
    height: `${duration * 60}px`
  };
};

// Sample events data
const sampleEvents = [
  {
    id: 1,
    title: 'Team Standup',
    description: 'Daily team sync to discuss progress and blockers',
    type: 'meeting',
    start: new Date(2025, 0, 17, 10, 0),
    end: new Date(2025, 0, 17, 10, 30),
    location: 'Conference Room A',
    organizer: 'Sarah Johnson',
    attendees: ['John Doe', 'Jane Smith', 'Mike Brown'],
    icon: Video
  },
  {
    id: 2,
    title: 'Project Workshop',
    description: 'Brainstorming session for new features',
    type: 'workshop',
    start: new Date(2025, 0, 17, 14, 0),
    end: new Date(2025, 0, 17, 15, 30),
    location: 'Workshop Room B',
    organizer: 'Mike Brown',
    attendees: ['Sarah Johnson', 'Alex Wilson', 'Lisa Chen'],
    icon: Briefcase
  }
];

const getEventsForDay = (date) => {
  return sampleEvents.filter(event => 
    event.start.getDate() === date.getDate() &&
    event.start.getMonth() === date.getMonth() &&
    event.start.getFullYear() === date.getFullYear()
  );
};

// Event Popup Component
const EventPopup = ({ event, onClose, position }) => {
  // [Previous EventPopup implementation remains the same]
  // ... [Keep existing EventPopup code]
};

const CalendarEventList = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [viewType, setViewType] = useState('day');

  const handleEventClick = (event, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + rect.width + 10,
      y: rect.top
    });
    setSelectedEvent(event);
  };

  const handleNextDay = () => {
    setCurrentDate(prev => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + 1);
      return next;
    });
  };

  const handlePrevDay = () => {
    setCurrentDate(prev => {
      const next = new Date(prev);
      next.setDate(prev.getDate() - 1);
      return next;
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      {/* Main Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]}
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button 
              className={`px-3 py-1.5 rounded text-sm transition-colors ${
                viewType === 'day' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setViewType('day')}
            >
              {currentDate.getDate()}
            </button>
            <span className="text-gray-400 px-1">|</span>
            <button 
              className={`px-3 py-1.5 rounded text-sm transition-colors ${
                viewType === 'month' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setViewType('month')}
            >
              {monthNames[currentDate.getMonth()]}
            </button>
            <span className="text-gray-400 px-1">|</span>
            <button 
              className={`px-3 py-1.5 rounded text-sm transition-colors ${
                viewType === 'year' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setViewType('year')}
            >
              {currentDate.getFullYear()}
            </button>
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Single Day Header */}
      <div className="flex items-center justify-between py-2 border-b">
        <button 
          onClick={handlePrevDay}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{dayNames[currentDate.getDay()].slice(0, 3)}</span>
          <span className="text-gray-400">|</span>
          <span className="text-sm">{currentDate.getDate()}</span>
        </div>

        <button 
          onClick={handleNextDay}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="relative min-h-[720px] bg-gray-50 rounded-lg">
        {/* Time labels */}
        <div className="absolute left-0 top-0 w-16 h-full border-r">
          {Array.from({ length: 13 }).map((_, i) => (
            <div 
              key={i}
              className="absolute text-xs text-gray-500"
              style={{ top: `${i * 60}px` }}
            >
              {(i + 9).toString().padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {/* Events container */}
        <div className="ml-16 relative">
          {/* Hour grid lines */}
          {Array.from({ length: 13 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-full border-t border-gray-200"
              style={{ top: `${i * 60}px` }}
            />
          ))}

          {/* Event Cards */}
          <div className="relative px-4">
            {getEventsForDay(currentDate).map(event => {
              const colors = getEventColors(event.type);
              const Icon = event.icon;
              return (
                <div
                  key={event.id}
                  className="absolute w-full left-0 px-4"
                  style={getEventStyle(event)}
                  onClick={(e) => handleEventClick(event, e)}
                >
                  <div className={`
                    h-full rounded-lg p-2 border shadow-sm cursor-pointer
                    ${colors.bg} ${colors.border} ${colors.text}
                    transition-all hover:shadow-md
                  `}>
                    <div className="flex items-center gap-1 mb-1">
                      <Icon className="w-4 h-4" />
                      <h4 className="font-medium truncate text-sm">{event.title}</h4>
                    </div>
                    <p className="text-xs opacity-75">
                      {formatTime(event.start)} - {formatTime(event.end)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Event Popup */}
      {selectedEvent && (
        <EventPopup 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
          position={popupPosition}
        />
      )}
    </div>
  );
};

export default CalendarEventList;


