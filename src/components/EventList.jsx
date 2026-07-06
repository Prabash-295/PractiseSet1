import EventCard from './EventCard';
import EmptyState from './EmptyState';
import './EventList.css';

function EventList({ events, onRegister, onDelete, showActions }) {
  if (!events || events.length === 0) {
    return <EmptyState message="No events found" />;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onRegister={onRegister}
          onDelete={onDelete}
          showActions={showActions}
        />
      ))}
    </div>
  );
}

export default EventList;
