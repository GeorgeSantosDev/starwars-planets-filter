import React from 'react';
import StarWarsProvider from './context/starWarsProvider';
import Header from './components/Header';
import Filters from './components/Filters';
import Table from './components/Table';

function App() {
  return (
    <StarWarsProvider className="app">
      <Header />
      <Filters />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
