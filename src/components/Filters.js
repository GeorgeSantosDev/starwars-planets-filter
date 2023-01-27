import React from 'react';
import NameFilter from './NameFilter';
import NumericFilter from './NumericFilter';
import SortFilter from './SortFilter';
import '../styles/Filters.css';

function Filters() {
  return (
    <form>
      <fieldset className="filters-container">
        <NameFilter />
        <NumericFilter />
        <SortFilter />
      </fieldset>
    </form>
  );
}

export default Filters;
