import { categories, clubs } from '../utils/helpers';
import './FilterBar.css';

function FilterBar({ filters, onFilterChange }) {
  const handleCategoryChange = (e) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  const handleClubChange = (e) => {
    onFilterChange({ ...filters, club: e.target.value });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sort: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({ category: '', club: '', sort: '' });
  };

  const hasFilters = filters.category || filters.club || filters.sort;

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select
          className="filter-select"
          value={filters.category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-label">Club</label>
        <select
          className="filter-select"
          value={filters.club}
          onChange={handleClubChange}
        >
          <option value="">All Clubs</option>
          {clubs.map((club) => (
            <option key={club} value={club}>{club}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-label">Sort By</label>
        <select
          className="filter-select"
          value={filters.sort}
          onChange={handleSortChange}
        >
          <option value="">Default</option>
          <option value="date-asc">Date (Earliest)</option>
          <option value="date-desc">Date (Latest)</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>
      {hasFilters && (
        <button className="btn btn-sm btn-outline filter-clear" onClick={clearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default FilterBar;
