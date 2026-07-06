import { useState, useEffect } from 'react';
import { categories, clubs } from '../utils/helpers';
import './EventForm.css';

function EventForm({ initialData, onSubmit, submitLabel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    club: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    seats: '',
    image: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        club: initialData.club || '',
        category: initialData.category || '',
        date: initialData.date || '',
        time: initialData.time || '',
        venue: initialData.venue || '',
        seats: initialData.seats || '',
        image: initialData.image || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.club) newErrors.club = 'Please select a club';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required';
    if (!formData.seats || formData.seats < 1) newErrors.seats = 'Valid seat count is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        seats: Number(formData.seats),
        seatsRemaining: initialData?.seatsRemaining ?? Number(formData.seats),
        featured: initialData?.featured ?? false,
      });
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form-input ${errors.title ? 'error' : ''}`}
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter event title"
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className={`form-input form-textarea ${errors.description ? 'error' : ''}`}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the event"
          rows="4"
        />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="club">Club</label>
          <select
            id="club"
            name="club"
            className={`form-input ${errors.club ? 'error' : ''}`}
            value={formData.club}
            onChange={handleChange}
          >
            <option value="">Select a club</option>
            {clubs.map((club) => (
              <option key={club} value={club}>{club}</option>
            ))}
          </select>
          {errors.club && <span className="form-error">{errors.club}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className={`form-input ${errors.category ? 'error' : ''}`}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="form-error">{errors.category}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className={`form-input ${errors.date ? 'error' : ''}`}
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="form-error">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            className={`form-input ${errors.time ? 'error' : ''}`}
            value={formData.time}
            onChange={handleChange}
          />
          {errors.time && <span className="form-error">{errors.time}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="venue">Venue</label>
        <input
          type="text"
          id="venue"
          name="venue"
          className={`form-input ${errors.venue ? 'error' : ''}`}
          value={formData.venue}
          onChange={handleChange}
          placeholder="Enter venue"
        />
        {errors.venue && <span className="form-error">{errors.venue}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="seats">Total Seats</label>
          <input
            type="number"
            id="seats"
            name="seats"
            className={`form-input ${errors.seats ? 'error' : ''}`}
            value={formData.seats}
            onChange={handleChange}
            placeholder="Number of seats"
            min="1"
          />
          {errors.seats && <span className="form-error">{errors.seats}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            className="form-input"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-lg form-submit">
        {submitLabel || 'Submit'}
      </button>
    </form>
  );
}

export default EventForm;
