import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Form() {
  const { namePlanet, setNamePlanet, number, setNumber } = useContext(AppContext);
  return (
    <form>
      <label htmlFor="inputName">
        <input
          name="namePlanet"
          id="inputName"
          value={ namePlanet }
          type="text"
          data-testid="name-filter"
          onChange={ (event) => setNamePlanet(event.target.value) }
        />
      </label>
      <label htmlFor="inputColumn">
        {' '}
        Coluna
        <select data-testid="column-filter">
          <option value="population" selected>population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="inputColumn">
        {' '}
        Operador
        <select data-testid="comparison-filter">
          <option value="maiorque" selected>maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="inputNumber">
        <input
          name="number"
          id="inputNumber"
          value={ number }
          type="number"
          data-testid="value-filter"
          onChange={ (event) => setNumber(event.target.value) }
        />
      </label>
      <button
        data-testid="value-filter"
        type="button"
      >
        Filtrar
      </button>
    </form>
  );
}
