import React, { useContext, useEffect } from 'react';
import starWarsContext from '../context/starWarsContext';

function Filters() {
  const { handleChangeName,
    filters,
    filteredPlanets,
    setFilter,
    searchedPlanets } = useContext(starWarsContext);

  const { filterByName: { name } } = filters;

  useEffect(() => {
    if (name) {
      const planetsFilterdByName = [...filteredPlanets].filter((planet) => planet.name
        .includes(name));
      setFilter(planetsFilterdByName);
    } else {
      setFilter(searchedPlanets);
    }
  }, [filters]);

  return (
    <form>
      <fieldset>
        <label htmlFor="filter-by-name">
          <input
            type="text"
            id="filter-by-name"
            data-testid="name-filter"
            onChange={ (event) => handleChangeName(event) }
            value={ name }
          />
        </label>
      </fieldset>
    </form>
  );
}

export default Filters;
