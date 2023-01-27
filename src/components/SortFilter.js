import React, { useState, useContext } from 'react';
import starWarsContext from '../context/starWarsContext';
import '../styles/SortFilter.css';

function SortFilter() {
  const { setFilters } = useContext(starWarsContext);

  const [sortValues, setSortValues] = useState({ column: 'population', sort: '' });

  const columnValues = ['population', 'orbital_period', 'diameter', 'rotation_period',
    'surface_water'];

  const handleChangeSortedColumn = ({ target }) => {
    setSortValues((prev) => ({ ...prev, column: target.value }));
  };

  const handleClickChooseSort = ({ target }) => {
    setSortValues((prev) => ({ ...prev, sort: target.value }));
  };

  const handleClickSort = (sort) => {
    setFilters((prev) => ({
      ...prev,
      order: sort,
    }));
  };

  return (
    <fieldset className="sort-filter-container">
      <label htmlFor="column-sort">
        <select
          data-testid="column-sort"
          id="column-sort"
          className="form-select"
          name="column-sort"
          value={ sortValues.column }
          onChange={ (e) => handleChangeSortedColumn(e) }
        >
          {
            columnValues.map((param, i) => (
              <option value={ param } key={ `${i}-${param}` }>
                { param.replace('_', ' ') }
              </option>
            ))
          }
        </select>
      </label>

      <label htmlFor="asc" className="form-check-label">
        Ascendente
        <input
          type="radio"
          id="asc"
          className="form-check-input"
          name="asc"
          value="ASC"
          data-testid="column-sort-input-asc"
          checked={ sortValues.sort === 'ASC' }
          onChange={ (e) => handleClickChooseSort(e) }
        />
      </label>

      <label htmlFor="desc" className="form-check-label">
        Descendente
        <input
          type="radio"
          id="desc"
          className="form-check-input"
          name="desc"
          value="DESC"
          data-testid="column-sort-input-desc"
          checked={ sortValues.sort === 'DESC' }
          onChange={ (e) => handleClickChooseSort(e) }
        />
      </label>

      <button
        type="button"
        className="btn btn-outline-warning sort-btn"
        onClick={ () => handleClickSort(sortValues) }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </fieldset>
  );
}

export default SortFilter;
