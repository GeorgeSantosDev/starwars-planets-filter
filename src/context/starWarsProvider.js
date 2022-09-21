import React, { useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const [searchedPlanets, setSearchedPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const [filters, setFilters] = useState({
    filterByName: { name: '' } });

  const getPlanets = (array) => setSearchedPlanets(array);
  const setFilter = (array) => setFilteredPlanets(array);

  const handleChangeName = ({ target }) => {
    const { value } = target;
    setFilters((prev) => ({
      ...prev,
      filterByName: { name: value } }));
  };

  const contextValue = {
    searchedPlanets,
    getPlanets,
    filteredPlanets,
    setFilter,
    filters,
    handleChangeName,
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
