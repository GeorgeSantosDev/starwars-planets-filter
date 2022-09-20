const fetchPlanets = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Ocorreu um erro: ${error}`);
  }
};

export default fetchPlanets;
