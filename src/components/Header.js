import React, { useEffect, useContext } from 'react';
import starWarsContext from '../context/starWarsContext';
import fetchPlanets from '../services/fetchPlanets';

function Header() {
  const { getPlanets, setFilter } = useContext(starWarsContext);

  useEffect(() => {
    const starWarsPlanets = async () => {
      const planets = await fetchPlanets();
      getPlanets(planets);
      setFilter(planets);
    };

    starWarsPlanets();
  }, [getPlanets, setFilter]);

  return (
    <header>
      <h1>Projeto StarWars Planet</h1>
    </header>
  );
}

export default Header;
