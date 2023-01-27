import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import App from '../App';

describe('Test all application', () => {
  beforeEach(() => {
    cleanup();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  });

  it('should fetch all planets correctly', async () => {
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
    })
  });

  it('should be able to filter a planet by name', async () => {
    render(<App />);

    await waitFor(() => {
      const planets = screen.getAllByTestId('planet-name');
      expect(planets.length).toBe(10);

      const nameFilter = screen.getByTestId('name-filter');
      userEvent.type(nameFilter, 'Tatooine')

      const planet = screen.getAllByTestId('planet-name');
      expect(planet.length).toBe(1);
    });
  });

  it('should be able to sort planets', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const columnSort = screen.getByTestId('column-sort');
    const asc = screen.getByLabelText('Ascendente');
    const desc = screen.getByLabelText('Descendente');
    const sortBtn = screen.getByTestId('column-sort-button');
    
    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(asc);
    userEvent.click(sortBtn);

    const planets = screen.getAllByTestId('planet-name');

    expect(planets[0].innerHTML).toBe('Yavin IV');

    userEvent.click(desc);
    userEvent.click(sortBtn);
    
    const planetsDesc = screen.getAllByTestId('planet-name');
    expect(planetsDesc[0].innerHTML).toBe('Coruscant');
  });

});