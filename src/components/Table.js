import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

function Table() {
  const { filteredPlanets } = useContext(starWarsContext);

  return (
    <table>
      <thead>
        <tr>
          {
            filteredPlanets && Object.keys(filteredPlanets[0])
              .filter((key) => key !== 'residents').map((head) => (
                <th key={ head }>{ head }</th>
              ))
          }
        </tr>
      </thead>
      <tbody>
        {
          filteredPlanets && filteredPlanets.map((planet, i) => (
            <tr key={ i }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
