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

  const columnValues = ['population', 'orbital_period', 'diameter', 'rotation_period',
    'surface_water'];

  const columnElements = filters.filterByNumericValues.reduce((acc, numericFilter) => (
    acc.filter((param) => param !== numericFilter.column)
  ), columnValues);

  const handleClickNumericFilter = (filter, funcReset) => {
    setFilters((prev) => ({
      ...prev,
      filterByNumericValues: [...prev.filterByNumericValues, filter],
    }));
    funcReset({
      column: columnElements[0], comparison: 'maior que', value: '0' });
  };

  const handleClickDeleteFilter = (filter) => {
    const newNumericFilters = filters.filterByNumericValues
      .filter((numericValues) => numericValues.column !== filter);
    setFilters((prev) => ({
      ...prev,
      filterByNumericValues: newNumericFilters,
    }));
  };

  const handleClickDeleteAllFilters = () => {
    setFilters((prev) => ({
      ...prev,
      filterByNumericValues: [],
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
    columnValues,
    columnElements,
    handleClickDeleteFilter,
    handleClickDeleteAllFilters,
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
