import React, { useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const [searchedPlanets, setSearchedPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: { column: '', sort: '' } });

  const contextValue = {
    searchedPlanets,
    setSearchedPlanets,
    filteredPlanets,
    setFilteredPlanets,
    filters,
    setFilters,
  };

  return (
    <starWarsContext.Provider value={ contextValue }>
      { children }
    </starWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
