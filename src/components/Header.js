import React, { useEffect, useContext } from 'react';
import starWarsContext from '../context/starWarsContext';
import logo from '../images/logo.gif';
import '../styles/Header.css';

function Header() {
  const { setSearchedPlanets, setFilteredPlanets } = useContext(starWarsContext);

  const fetchPlanets = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.log(`Ocorreu um erro: ${error}`);
    }
  };

  useEffect(() => {
    const getPlanets = async () => {
      const planets = await fetchPlanets();
      setSearchedPlanets(planets);
      setFilteredPlanets(planets);
    };

    getPlanets();
  }, []);

  return (
    <header>
      <img src={ logo } alt="StarWars" />
    </header>
  );
}

export default Header;
