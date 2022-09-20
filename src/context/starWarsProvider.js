import React, { useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const [searchedPlanets, setSearchedPlanets] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState('');

  const getPlanets = (array) => setSearchedPlanets(array);
  const setFilter = (array) => setFilteredPlanets(array)

  const contextValue = {
    searchedPlanets,
    getPlanets,
    filteredPlanets,
    setFilter,
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
