import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

const FilterableSelect = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="filterable-select">
      <div className="select-box" onClick={ handleToggleDropdown }>
        <input
          type="text"
          className="filter-input"
          placeholder="Select an option"
          value={ selectedOption || filterValue }
          onChange={ handleFilterChange }
          readOnly
        />
        <span className="dropdown-icon">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="dropdown">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Usage example
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

ReactDOM.render(
  <FilterableSelect options={options} />,
  document.getElementById('root')
);
