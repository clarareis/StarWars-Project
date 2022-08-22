import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Form() {
  const { api,
    setApi,
    namePlanet,
    setNamePlanet,
    number,
    setNumber } = useContext(AppContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const dataForm = Object.fromEntries(new FormData(form).entries());
    const filterAPI = api.filter((element) => {
      switch (dataForm.operators) {
      case 'maior que':
        return +element[dataForm.parameters] > +dataForm.number;
      case 'menor que':
        return +element[dataForm.parameters] < +dataForm.number;
      default:
        return +element[dataForm.parameters] === +dataForm.number;
      }
    });
    setApi(filterAPI);
  };
  return (
    <form onSubmit={ handleSubmit }>
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
        <select
          data-testid="column-filter"
          name="parameters"
          defaultValue="population"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="inputColumn">
        {' '}
        Operador
        <select
          data-testid="comparison-filter"
          name="operators"
          defaultValue="maior que"
        >
          <option value="maior que">maior que</option>
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
        data-testid="button-filter"
        type="submit"
      >
        Filtrar
      </button>
    </form>
  );
}
