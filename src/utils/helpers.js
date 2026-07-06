export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export function isUpcoming(dateString) {
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
}

export function isPast(dateString) {
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate < today;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const categories = [
  'Academic',
  'Cultural',
  'Sports',
  'Music',
  'Art',
  'Technology',
  'Workshop',
  'Seminar',
  'Festival',
  'Competition',
];

export const clubs = [
  'Tech Club',
  'Cultural Club',
  'Sports Club',
  'Music Club',
  'Art Club',
  'Debate Club',
  'Photography Club',
  'Entrepreneurship Club',
];
