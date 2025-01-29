import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
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

        const getContrastColor = (backgroundColor) => {
          if (!backgroundColor) return '#000000';
          const hex = backgroundColor.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          return luminance > 0.5 ? '#000000' : '#ffffff';
        };

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
              <div className="event-container" key={event.id}>
                <div
                  className={`event ${event.type}`}
                  style={{
                    backgroundColor: event.color || '#ffffff',
                    color: getContrastColor(event.color),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEventDetails(event);
                  }}
                >
                  {event.title}
                </div>
                <EventHoverCard 
                  event={event}
                  style={{
                    backgroundColor: event.color || '#ffffff',
                    color: getContrastColor(event.color),
                  }}
                  onEdit={() => {
                    setEditedEvent(event);
                    setIsEditing(true);
                  }}
                  onDelete={handleDeleteEvent}
                />
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


CalendarEventsPage.jsx:325 Uncaught ReferenceError: getContrastColor is not defined
    at renderEventPopup (CalendarEventsPage.jsx:325:26)
    at CalendarEventsPage (CalendarEventsPage.jsx:2282:28)
    at renderWithHooks (chunk-UJBO7CMO.js?v=1c5c8ada:12171:26)
    at updateFunctionComponent (chunk-UJBO7CMO.js?v=1c5c8ada:14577:28)
    at beginWork (chunk-UJBO7CMO.js?v=1c5c8ada:15912:22)
    at HTMLUnknownElement.callCallback2 (chunk-UJBO7CMO.js?v=1c5c8ada:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-UJBO7CMO.js?v=1c5c8ada:3699:24)
    at invokeGuardedCallback (chunk-UJBO7CMO.js?v=1c5c8ada:3733:39)
    at beginWork$1 (chunk-UJBO7CMO.js?v=1c5c8ada:19761:15)
    at performUnitOfWork (chunk-UJBO7CMO.js?v=1c5c8ada:19194:20)Understand this errorAI
chunk-UJBO7CMO.js?v=1c5c8ada:14036 The above error occurred in the <CalendarEventsPage> component:

    at CalendarEventsPage (http://localhost:3001/t500v3/src/modules/calendar/CalendarEventsPage.jsx?t=1738114310678:14:43)
    at div
    at Provider (http://localhost:3001/t500v3/node_modules/.vite/deps/react-redux.js?v=1c5c8ada:1089:3)
    at CalendarApp (http://localhost:3001/t500v3/src/modules/calendar/CalendarMain.jsx?t=1738110133242:18:37)
    at RenderedRoute (http://localhost:3001/t500v3/node_modules/.vite/deps/react-router-dom.js?v=1c5c8ada:3547:5)
    at AppRouter (http://localhost:3001/t500v3/src/router/AppRouter.jsx?t=1738110133242:138:19)
    at SelectedRowContextProvider (http://localhost:3001/t500v3/src/context/SelectedRow/SelectedRowContext.jsx:15:46)
    at div
    at ThemeProvider (http://localhost:3001/t500v3/src/context/themeContext/themeprovider.jsx:13:26)
    at ResizeWidthContext (http://localhost:3001/t500v3/src/context/widthContext/widthContext.jsx:23:38)
    at ArcGlobalContext (http://localhost:3001/t500v3/src/context/GlobalContext/GlobalContext.jsx:24:36)
    at QueryClientProvider (http://localhost:3001/t500v3/node_modules/.vite/deps/@tanstack_react-query.js?v=1c5c8ada:2738:3)
    at PlatformApp (http://localhost:3001/t500v3/src/apps/PlatformApp.jsx?t=1738110133242:41:33)
    at Suspense
    at AppContextProvider (http://localhost:3001/t500v3/src/context/appContext/index.jsx:15:31)
    at div
    at Localization (http://localhost:3001/t500v3/src/locale/Localization.jsx:17:40)
    at DefaultApp
    at PlatformOS (http://localhost:3001/t500v3/src/apps/PlatformOS.jsx?t=1738110133242:116:39)
    at Suspense
    at Provider (http://localhost:3001/t500v3/node_modules/.vite/deps/react-redux.js?v=1c5c8ada:1089:3)
    at Router (http://localhost:3001/t500v3/node_modules/.vite/deps/react-router-dom.js?v=1c5c8ada:3925:15)
    at BrowserRouter (http://localhost:3001/t500v3/node_modules/.vite/deps/react-router-dom.js?v=1c5c8ada:4660:5)
    at RoutApp

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-UJBO7CMO.js?v=1c5c8ada:14036Understand this errorAI
chunk-UJBO7CMO.js?v=1c5c8ada:9145 Uncaught ReferenceError: getContrastColor is not defined
    at renderEventPopup (CalendarEventsPage.jsx:325:26)
    at CalendarEventsPage (CalendarEventsPage.jsx:2282:28)
    at renderWithHooks (chunk-UJBO7CMO.js?v=1c5c8ada:12171:26)
    at updateFunctionComponent (chunk-UJBO7CMO.js?v=1c5c8ada:14577:28)
    at beginWork (chunk-UJBO7CMO.js?v=1c5c8ada:15912:22)
    at beginWork$1 (chunk-UJBO7CMO.js?v=1c5c8ada:19749:22)
    at performUnitOfWork (chunk-UJBO7CMO.js?v=1c5c8ada:19194:20)
    at workLoopSync (chunk-UJBO7CMO.js?v=1c5c8ada:19133:13)
    at renderRootSync (chunk-UJBO7CMO.js?v=1c5c8ada:19112:15)
    at recoverFromConcurrentError (chunk-UJBO7CMO.js?v=1c5c8ada:18732:28)
