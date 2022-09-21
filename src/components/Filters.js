import React, { useContext, useEffect, useState } from 'react';
import starWarsContext from '../context/starWarsContext';

function Filters() {
  const { handleChangeName,
    filters,
    filteredPlanets,
    setFilter,
    searchedPlanets,
    handleClickNumericFilter,
    columnValues,
    columnElements,
    handleClickDeleteFilter,
    handleClickDeleteAllFilters } = useContext(starWarsContext);

  const { filterByName: { name }, filterByNumericValues } = filters;

  const [filterNumericValues, setFilterNumericValues] = useState({
    column: 'population', comparison: 'maior que', value: '0' });

  const { column, comparison, value } = filterNumericValues;

  const handleChangeNumericFilter = ({ target }) => {
    setFilterNumericValues((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    if (name) {
      const planetsFilteredByName = [...filteredPlanets].filter((planet) => planet.name
        .includes(name));
      setFilter(planetsFilteredByName);
    } else {
      setFilter(searchedPlanets);
    }
  }, [filters]);

  useEffect(() => {
    if (filterByNumericValues.length > 0) {
      const planetsFilteredByNumericValues = filterByNumericValues
        .reduce((acc, values) => {
          switch (values.comparison) {
          case 'maior que': return acc
            .filter((planet) => Number(planet[values.column]) > Number(values.value));
          case 'menor que': return acc
            .filter((planet) => Number(planet[values.column]) < Number(values.value));
          default: return acc
            .filter((planet) => Number(planet[values.column]) === Number(values.value));
          }
        },
        [...searchedPlanets]);

      setFilter(planetsFilteredByNumericValues);
      console.log(filters.filterByNumericValues);
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
        <label htmlFor="column">
          <select
            data-testid="column-filter"
            id="column"
            name="column"
            value={ column }
            onChange={ handleChangeNumericFilter }
          >
            {
              filterByNumericValues.length > 0 ? columnElements.map((param, i) => (
                <option value={ param } key={ `${i}-${param}` }>{ param }</option>
              ))
                : columnValues.map((param, i) => (
                  <option value={ param } key={ `${i}-${param}` }>{ param }</option>
                ))
            }
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            data-testid="comparison-filter"
            id="comparison"
            name="comparison"
            value={ comparison }
            onChange={ handleChangeNumericFilter }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            type="text"
            data-testid="value-filter"
            id="value"
            name="value"
            value={ value }
            onChange={ handleChangeNumericFilter }
          />
        </label>
        <button
          type="button"
          onClick={
            () => handleClickNumericFilter(filterNumericValues, setFilterNumericValues)
          }
          data-testid="button-filter"
        >
          Filtrar
        </button>
        <section>
          {
            filterByNumericValues.map((numericValues, i) => {
              const { column: a, comparison: b, value: c } = numericValues;
              return (
                <div key={ `${i}-${c}` } data-testid="filter">
                  <p>{ `${a}-${b}-${c}` }</p>
                  <button
                    type="button"
                    onClick={ () => handleClickDeleteFilter(a) }
                  >
                    X
                  </button>
                </div>
              );
            })
          }
          <button
            type="button"
            onClick={ () => handleClickDeleteAllFilters() }
            data-testid="button-remove-filters"
          >
            Remover todos os filtros
          </button>
        </section>
      </fieldset>
    </form>
  );
}

export default Filters;
