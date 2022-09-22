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
    handleClickDeleteAllFilters,
    handleClickSort } = useContext(starWarsContext);

  const { filterByName: { name }, filterByNumericValues, order } = filters;

  const [filterNumericValues, setFilterNumericValues] = useState({
    column: 'population', comparison: 'maior que', value: '0' });

  const [sortValues, setSortValues] = useState({ column: 'population', sort: '' });

  const { column, comparison, value } = filterNumericValues;

  const handleChangeNumericFilter = ({ target }) => {
    setFilterNumericValues((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const separateArrayNumbers = (array) => (
    array.filter((planet) => planet[order.column] !== 'unknown')
  );

  const separateArrayUnknowns = (array) => (
    array.filter((planet) => planet[order.column] === 'unknown')
  );

  const isSorted = (array) => {
    const kindOfSort = {
      ASC: () => {
        const numbers = separateArrayNumbers(array);
        const unknowns = separateArrayUnknowns(array);
        const ordenatedArray = numbers
          .sort((a, b) => Number(a[order.column]) - Number(b[order.column]));
        return [...ordenatedArray, ...unknowns];
      },
      DESC: () => {
        const numbers = separateArrayNumbers(array);
        const unknowns = separateArrayUnknowns(array);
        const ordenatedArray = numbers
          .sort((a, b) => Number(b[order.column]) - Number(a[order.column]));
        return [...ordenatedArray, ...unknowns];
      },
    };

    return order.sort ? kindOfSort[order.sort] : array;
  };

  useEffect(() => {
    if (name) {
      const planetsFilteredByName = [...filteredPlanets].filter((planet) => planet.name
        .includes(name));

      setFilter(isSorted(planetsFilteredByName));
    } else {
      setFilter(isSorted([...searchedPlanets]));
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

      setFilter(isSorted(planetsFilteredByNumericValues));
    }
  }, [filters]);

  const handleClickChooseSort = ({ target }) => {
    setSortValues((prev) => ({ ...prev, sort: target.value }));
  };

  const handleChangeSortedColumn = ({ target }) => {
    setSortValues((prev) => ({ ...prev, column: target.value }));
  };

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
        <label htmlFor="column-sort">
          <select
            data-testid="column-sort"
            id="column-sort"
            name="column-sort"
            value={ sortValues.column }
            onChange={ (e) => handleChangeSortedColumn(e) }
          >
            {
              columnValues.map((param, i) => (
                <option value={ param } key={ `${i}-${param}` }>{ param }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="asc">
          Ascendente
          <input
            type="radio"
            id="asc"
            name="asc"
            value="ASC"
            data-testid="column-sort-input-asc"
            checked={ sortValues.sort === 'ASC' }
            onChange={ (e) => handleClickChooseSort(e) }
          />
        </label>
        <label htmlFor="desc">
          Descendente
          <input
            type="radio"
            id="desc"
            name="desc"
            value="DESC"
            data-testid="column-sort-input-desc"
            checked={ sortValues.sort === 'DESC' }
            onChange={ (e) => handleClickChooseSort(e) }
          />
        </label>
        <button
          type="button"
          onClick={ () => handleClickSort(sortValues) }
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
      </fieldset>
    </form>
  );
}

export default Filters;
