import React, { useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const [searchedPlanets, setSearchedPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [] });

  const getPlanets = (array) => setSearchedPlanets(array);
  const setFilter = (array) => setFilteredPlanets(array);

  const handleChangeName = ({ target }) => {
    const { value } = target;
    setFilters((prev) => ({
      ...prev,
      filterByName: { name: value } }));
  };

  const handleClickNumericFilter = (filter) => {
    setFilters((prev) => ({
      ...prev,
      filterByNumericValues: [...prev.filterByNumericValues, filter],
    }));
  };

  const contextValue = {
    searchedPlanets,
    getPlanets,
    filteredPlanets,
    setFilter,
    filters,
    handleChangeName,
    handleClickNumericFilter,
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
