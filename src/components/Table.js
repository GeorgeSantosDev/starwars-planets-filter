import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';
import '../styles/Table.css';

function Table() {
  const { filteredPlanets } = useContext(starWarsContext);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {
              filteredPlanets.length > 0 && Object.keys(filteredPlanets[0])
                .filter((key) => key !== 'residents').map((head) => (
                  <th key={ head }>
                    { head.replace('_', ' ').toUpperCase() }
                  </th>
                ))
            }
          </tr>
        </thead>

        <tbody>
          {
            filteredPlanets.length > 0 && filteredPlanets.map((planet, i) => (
              <tr
                key={ i }
                className={ i % 2 === 0 ? 'tr-color' : '' }
              >
                <td data-testid="planet-name">{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>
                  {
                    planet.films.reduce((acc, film) => `${acc}
                    ${film}`, '')
                  }
                </td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
