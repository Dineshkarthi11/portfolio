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
  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const eventPopupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        eventPopupRef.current && 
        !eventPopupRef.current.contains(event.target)
      ) {
        setSelectedEventDetails(null);
      }
  
      if (
        monthDropdownRef.current && 
        !monthDropdownRef.current.contains(event.target)
      ) {
        setShowMonthSelect(false);
      }
  
      if (
        yearDropdownRef.current && 
        !yearDropdownRef.current.contains(event.target)
      ) {
        setShowYearSelect(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const events = [
    { 
      id: 1, 
      title: 'New Year Celebration', 
      date: new Date(2025, 0, 1, 0, 0), 
      type: 'all-day', 
      description: 'Welcome the New Year!' 
    },
    { 
      id: 2, 
      title: 'Company Retreat', 
      startDate: new Date(2025, 0, 17, 9, 0), 
      endDate: new Date(2025, 0, 19, 17, 0), 
      type: 'long', 
      description: 'Annual team building event' 
    },
    { 
      id: 3, 
      title: 'Team Meeting', 
      date: new Date(2025, 0, 22, 18, 30), 
      type: 'timed', 
      description: 'Quarterly team sync'
    },
    { 
      id: 4, 
      title: 'Birthday Party', 
      date: new Date(2025, 0, 24, 3, 0), 
      type: 'timed', 
      description: 'Surprise birthday celebration' 
    }
  ];

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
      return event.date >= startOfWeek && event.date <= endOfWeek;
    });
  };

  const getEventsForDay = (date) => {
    return events.filter(event => {
      if (event.type === 'long') {
        return event.startDate <= date && event.endDate >= date;
      }
      return event.date.toDateString() === date.toDateString();
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
    <div className="event-popup" ref={eventPopupRef}>
      {selectedEventDetails && (
        <>
          <button 
            className="close-button"
            onClick={() => setSelectedEventDetails(null)}
          >
            ×
          </button>
          <h3>{selectedEventDetails.title}</h3>
          <p>
            {selectedEventDetails.type === 'long' 
              ? `${formatDate(selectedEventDetails.startDate)} - 
                 ${formatDate(selectedEventDetails.endDate)}`
              : formatDate(selectedEventDetails.date)
            }
          </p>
          <p>
            Time: {selectedEventDetails.type === 'long' 
              ? `${formatDate(selectedEventDetails.startDate, { hour: '2-digit', minute: '2-digit' })} - 
                 ${formatDate(selectedEventDetails.endDate, { hour: '2-digit', minute: '2-digit' })}`
              : formatDate(selectedEventDetails.date, { hour: '2-digit', minute: '2-digit' })
            }
          </p>
          <p>{selectedEventDetails.description}</p>
        </>
      )}
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

    return (
      <div className="week-view-container">
        <div className="week-header" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '15px' ,
          marginLeft:"35%"
        }}>
          <h2>{formatWeekRange(startOfWeek, endOfWeek)}</h2>
        </div>
        <div className="calendar-grid" style={{ gridTemplateColumns: 'repeat(8, 1fr)', }}>
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
              <div className="calendar-header-cell">{hour}:00</div>
              {[0, 1, 2, 3, 4, 5, 6].map(index => {
                const date = cloneDate(startOfWeek);
                date.setDate(startOfWeek.getDate() + index);
                date.setHours(hour, 0, 0, 0);
                
                const hourEvents = eventsForWeek.filter(event => {
                  if (event.type === 'long') {
                    return date >= event.startDate && date <= event.endDate;
                  }
                  return event.date.getHours() === hour && 
                         event.date.toDateString() === date.toDateString();
                });
                
                return (
                  <div key={index} className="calendar-cell">
                    {hourEvents.map(event => (
                      <div 
                        key={event.id} 
                        className={`event ${event.type}`} 
                        onClick={() => setSelectedEventDetails(event)}
                      >
                        <span style={{ marginRight: '4px' }}>
                          {formatDate(event.date || event.startDate, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
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
      <div className="day-view-container">
        <div className="day-header">
          {formatDate(currentDate, { weekday: 'short', day: 'numeric' })}
        </div>
        <div className="day-content">
          <div className="hours-column">
            {[...Array(24)].map((_, hour) => (
              <div key={hour} className="hour-label">{hour}:00</div>
            ))}
          </div>
          <div className="events-column">
            {[...Array(24)].map((_, hour) => (
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
                        {formatDate(event.date || event.startDate, { hour: '2-digit', minute: '2-digit' })}
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

  return (
    <div className="calendar-container" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: "Lexend Deca",
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      background: '#fff',
      padding: '20px'
    }}>
      <style>
        {`
          .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          button {
           border: none;
           cursor: pointer;
           background-color : #6182ca;
           color: white;
           gap: 5px;
           border-radius: 6px;
           padding: 8px 12px;
           font-size: 14px;
           transition: all 0.3s ease;
          }

          button:hover {
           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.5);
}

.nav-buttons button {
  background: #4a90e2;
  color: white;
}

.nav-buttons button:hover {
  background: #357abd;
}

.dropdown {
  position: absolute;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
}

.dropdown-item {
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f0f0f0;
}

.view-buttons button {
  background: #f0f0f0;
  color: #333;
}

.view-buttons button.active {
  background: #4a90e2;
  color: white;
}

.view-buttons button:hover {
  background: #ddd;
}

.dropdown::-webkit-scrollbar {
  width: 8px;
}

.dropdown::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 6px;
}

.dropdown::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}


          .nav-buttons button {
            background: #4a90e2;
            color: white;
            border: none;
            padding: 8px 16px;
            margin: 0 4px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
          }

          .nav-buttons button:hover {
            background: #357abd;
          }

          .view-buttons button {
            background: #f0f0f0;
            border: none;
            padding: 8px 16px;
            margin: 0 4px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s;
          }

          .view-buttons button.active {
            background: #4a90e2;
            color: white;
          }

          .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 1px;
            background: #e0e0e0;
          }

          .calendar-header-cell {
            background: white;
            padding: 10px;
            text-align: center;
            font-weight: bold;
          }

          .calendar-cell {
            background: white;
            min-height: 100px;
            padding: 10px;
            position: relative;
          }

          .calendar-cell.inactive {
            color: #aaa;
          }


          .day-view-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.day-header {
  background-color: #f4f4f4;
  padding: 10px 15px;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.day-content {
  display: flex;
}

.hours-column {
  width: 60px;
  border-right: 1px solid #e0e0e0;
  background-color: #f9f9f9;
}

.hour-label {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  font-size: 12px;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
}

.events-column {
  flex: 1;
}

.hour-cell {
  height: 60px;
  border-bottom: 1px solid #f0f0f0;
  padding: 5px;
  position: relative;
}

.event {
  margin: 2px 0;
  padding: 5px;
  border-radius: 4px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event.all-day { 
  background-color: #e8e0ff; 
  color: #5a3ea4; 
}

.event.long { 
  background-color: #e0f0ff; 
  color: #2d6bb7; 
}

.event.timed { 
  background-color: #e0ffe5; 
  color: #287c3d; 
}

          .event {
            padding: 4px 8px;
            margin: 2px 0;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .event.all-day { background: #e8e0ff; color: #5a3ea4; }
          .event.long { background: #e0f0ff; color: #2d6bb7; }
          .event.timed { background: #e0ffe5; color: #287c3d; }

          .dropdown-column {
            margin-top : 340px;
            position: absolute;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
          }

                    .dropdown-item {
            padding: 8px 16px;
            background: white;
            cursor: pointer;
            transition: background 0.3s;
          }

          .dropdown-item:hover {
            background: #f0f0f0;
          }

          .event-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            z-index: 1000;
          }

          .event-popup .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
          }

          .event-popup h3 {
            margin: 0;
            margin-bottom: 10px;
            font-size: 20px;
          }

          .event-popup p {
            margin: 5px 0;
            font-size: 14px;
            color: #333;
          }

          .calendar-container {
            position: relative;
          }
        `}
      </style>
      <div className="calendar-header">
      <div className="nav-buttons">
          {view === 'month' && (
            <>
              <button onClick={() => navigateMonth(-1)}>←</button>
              <button onClick={() => navigateMonth(1)}>→</button>
              <button onClick={goToToday}>Today</button>
            </>
          )}
          {view === 'week' && (
            <>
              <button onClick={() => navigateWeek(-1)}>←</button>
              <button onClick={() => navigateWeek(1)}>→</button>
              <button onClick={goToToday}>Today</button>
            </>
          )}
          {view === 'day' && (
            <>
              <button onClick={() => navigateDay(-1)}>←</button>
              <button onClick={() => navigateDay(1)}>→</button>
              <button onClick={goToToday}>Today</button>
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
            {getDaysInMonth(currentDate).map((day, index) => (
              <div
                key={index}
                className={`calendar-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
                onClick={() => setCurrentDate(day.date)}
              >
                <div className="date-label">{day.date.getDate()}</div>
                {getEventsForDate(day.date).map(event => (
                  <div
                    key={event.id}
                    className={`event ${event.type}`}
                    onClick={() => setSelectedEventDetails(event)}
                  >
                    <span style={{ marginRight: '4px' }}>
                      {event.type === 'long'
                        ? `${formatDate(event.startDate, {
                            hour: '2-digit',
                            minute: '2-digit',
                          })} - ${formatDate(event.endDate, {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}`
                        : formatDate(event.date, { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>

      {selectedEventDetails && renderEventPopup()}

    </div>
  );
};

export default CalendarEventsPage;


.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

button {
  border: none;
  cursor: pointer;
  background-color: #6182ca;
  color: white;
  gap: 5px;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  transition: all 0.3s ease;
}

button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.5);
}

.nav-buttons button {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.nav-buttons button:hover {
  background: #357abd;
}

.view-buttons button {
  background: #f0f0f0;
  border: none;
  padding: 8px 16px;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.view-buttons button.active {
  background: #4a90e2;
  color: white;
}

.view-buttons button:hover {
  background: #ddd;
}

.dropdown {
  position: absolute;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
  max-width: 100%;
}

.dropdown-item {
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f0f0f0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e0e0e0;
}

.calendar-header-cell {
  background: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}

.calendar-cell {
  background: white;
  min-height: 100px;
  padding: 10px;
  position: relative;
}

.calendar-cell.inactive {
  color: #aaa;
}

.day-view-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.day-header {
  background-color: #f4f4f4;
  padding: 10px 15px;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.day-content {
  display: flex;
  flex-wrap: wrap;
}

.hours-column {
  width: 60px;
  border-right: 1px solid #e0e0e0;
  background-color: #f9f9f9;
}

.hour-label {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  font-size: 12px;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
}

.events-column {
  flex: 1;
}

.hour-cell {
  height: 60px;
  border-bottom: 1px solid #f0f0f0;
  padding: 5px;
  position: relative;
}

.event {
  margin: 2px 0;
  padding: 5px;
  border-radius: 4px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event.all-day {
  background-color: #e8e0ff;
  color: #5a3ea4;
}

.event.long {
  background-color: #e0f0ff;
  color: #2d6bb7;
}

.event.timed {
  background-color: #e0ffe5;
  color: #287c3d;
}

.dropdown-column {
  margin-top: 340px;
  position: absolute;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 8px 16px;
  background: white;
  cursor: pointer;
  transition: background 0.3s;
}

.dropdown-item:hover {
  background: #f0f0f0;
}

.event-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.event-popup .close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.event-popup h3 {
  margin: 0;
  margin-bottom: 10px;
  font-size: 20px;
}

.event-popup p {
  margin: 5px 0;
  font-size: 14px;
  color: #333;
}

.calendar-container {
  position: relative;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .calendar-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .hours-column {
    width: 50px;
  }

  .calendar-header {
    flex-direction: column;
    gap: 10px;
  }

  button {
    font-size: 12px;
    padding: 6px 10px;
  }

  .dropdown-item {
    padding: 10px 12px;
  }
}

@media (max-width: 768px) {
  .calendar-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .hours-column {
    width: 40px;
  }

  .day-header {
    font-size: 14px;
  }

  .event-popup {
    width: 90%;
  }

  .dropdown {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .calendar-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hours-column {
    width: 30px;
  }

  .day-header {
    font-size: 12px;
  }

  .calendar-header {
    flex-direction: column;
  }

  .event {
    font-size: 10px;
  }

  .dropdown-item {
    font-size: 12px;
  }
}
