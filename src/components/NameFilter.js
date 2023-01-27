import React, { useContext, useEffect } from 'react';
import starWarsContext from '../context/starWarsContext';
import isSorted from '../utils/sortFunction';

function NameFilter() {
  const { setFilters,
    filters,
    filteredPlanets,
    searchedPlanets,
    setFilteredPlanets } = useContext(starWarsContext);

  const { filterByName: { name }, order } = filters;

  useEffect(() => {
    if (name) {
      const planetsFilteredByName = [...filteredPlanets].filter((planet) => planet.name
        .includes(name));

      setFilteredPlanets(isSorted(planetsFilteredByName, order));
    } else {
      setFilteredPlanets(isSorted([...searchedPlanets], order));
    }
  }, [filters]);

  const handleFilterByName = ({ target }) => {
    const { value } = target;
    setFilters((prev) => ({
      ...prev,
      filterByName: { name: value } }));
  };

  return (
    <label htmlFor="filter-by-name" className="form-label">
      <input
        type="text"
        id="filter-by-name"
        className="form-control"
        data-testid="name-filter"
        onChange={ (event) => handleFilterByName(event) }
        value={ name }
      />
    </label>
  );
}

export default NameFilter;
