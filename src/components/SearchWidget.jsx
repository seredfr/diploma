import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (isOpen && query.trim()) {
      navigate(`/catalog.html?q=${encodeURIComponent(query)}`);
    }
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <>
      <div 
        data-id="search-expander" 
        className="header-controls-pic header-controls-search"
        onClick={handleSearchClick}
      ></div>
      <form 
        data-id="search-form" 
        className={`header-controls-search-form form-inline ${!isOpen ? 'invisible' : ''}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <input 
          ref={inputRef}
          className="form-control" 
          placeholder="Поиск" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </>
  );
}

export default SearchWidget;