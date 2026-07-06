import './SearchBar.css';

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <span className="search-icon">&#128269;</span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder || 'Search events...'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')}>
          &times;
        </button>
      )}
    </div>
  );
}

export default SearchBar;
