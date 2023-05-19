import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, fetchEvents, fetchResidents, AppDispatch} from './store';



const App: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const residents = useSelector((state: RootState) => state.events.residents);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchResidents());
  }, [dispatch]);


  return (
    <div >
      <h1>Open Events</h1>
      <div className="event-list">
        {events.map((event) => {
          const resident = residents.find((r) => r.id === event.residentId);
          const formattedDateTime = new Date(event.datetime * 1000).toLocaleString('en-au');

          return (
            <div key={event.id} className="event-item">
              <div>
                <strong>Type:</strong> {event.type}
              </div>
              <div>
                <strong>Date and Time:</strong> {formattedDateTime}
              </div>
              <div>
                <strong>Status:</strong> {event.status}
              </div>
              <div>
                <strong>Room ID:</strong> {event.roomId}
              </div>
              <div>
                <strong>Resident Name:</strong> {resident?.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
