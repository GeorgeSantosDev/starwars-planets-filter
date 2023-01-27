import React, { useContext, useState, useEffect } from 'react';
import starWarsContext from '../context/starWarsContext';
import isSorted from '../utils/sortFunction';
import '../styles/NumericFilter.css';

function NumericFilter() {
  const { filters,
    setFilters,
    setFilteredPlanets,
    searchedPlanets } = useContext(starWarsContext);

  const { filterByNumericValues, order } = filters;

  const [filterNumericValues, setFilterNumericValues] = useState({
    column: 'population', comparison: 'maior que', value: '0' });

  const { column, comparison, value } = filterNumericValues;

  const columnValues = ['population', 'orbital_period', 'diameter', 'rotation_period',
    'surface_water'];

  const columnElements = filterByNumericValues.reduce((acc, numericFilter) => (
    acc.filter((param) => param !== numericFilter.column)
  ), columnValues);

  const handleFilterByNumericValue = ({ target }) => {
    setFilterNumericValues((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

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

      setFilteredPlanets(isSorted(planetsFilteredByNumericValues, order));
    }
  }, [filters]);

  const filterByNumericValue = (filter) => {
    setFilters((prev) => ({
      ...prev,
      filterByNumericValues: [...prev.filterByNumericValues, filter],
    }));

    setFilterNumericValues({
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

  return (
    <fieldset className="numeric-filters-container">
      <section className="numeric-params-container">
        <label htmlFor="column">
          <select
            data-testid="column-filter"
            id="column"
            className="form-select"
            name="column"
            value={ column }
            onChange={ handleFilterByNumericValue }
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
            className="form-select"
            name="comparison"
            value={ comparison }
            onChange={ handleFilterByNumericValue }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="value" className="form-label">
          <input
            type="text"
            data-testid="value-filter"
            id="value"
            className="form-control"
            name="value"
            value={ value }
            onChange={ handleFilterByNumericValue }
          />
        </label>

        <button
          type="button"
          className="btn btn-outline-warning"
          onClick={
            () => filterByNumericValue(filterNumericValues)
          }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </section>

      <section>
        {
          filterByNumericValues.map((numericValues, i) => {
            const { column: a, comparison: b, value: c } = numericValues;
            return (
              <div key={ `${i}-${c}` } data-testid="filter" className="numeric-filter">
                <p>{ `${a}-${b}-${c}` }</p>
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={ () => handleClickDeleteFilter(a) }
                >
                  Deletar
                </button>
              </div>
            );
          })
        }

        <button
          type="button"
          className="btn btn-outline-danger remove-all-btn"
          onClick={ handleClickDeleteAllFilters }
          data-testid="button-remove-filters"
        >
          Remover todos os filtros
        </button>
      </section>
    </fieldset>
  );
}

export default NumericFilter;
