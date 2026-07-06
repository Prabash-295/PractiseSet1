const API_URL = 'https://67e92ec7bdcaa2b7f5ba9e53.mockapi.io/api/v1';

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export function getEvents() {
  return request('/events');
}

export function getEventById(id) {
  return request(`/events/${id}`);
}

export function createEvent(eventData) {
  return request('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  });
}

export function updateEvent(id, eventData) {
  return request(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  });
}

export function deleteEvent(id) {
  return request(`/events/${id}`, {
    method: 'DELETE',
  });
}
