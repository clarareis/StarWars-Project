import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Form() {
  const {
    namePlanet,
    setNamePlanet,
    optionsParameters,
    handleStoreFilter,
    addFilterToStore,
    storeFilter,
    removeAFilter,
    storeAppliedFilters,
    removeAll } = useContext(AppContext);

  return (
    <section>
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
          onChange={ ({ target }) => handleStoreFilter(target) }
          value={ storeFilter.parameters }
        >
          {optionsParameters.map((option) => (
            <option
              key={ option }
              value={ option }
            >
              {option}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="inputColumn">
        {' '}
        Operador
        <select
          data-testid="comparison-filter"
          name="operators"
          onChange={ ({ target }) => handleStoreFilter(target) }
          value={ storeFilter.operators }
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
          value={ storeFilter.number }
          type="number"
          data-testid="value-filter"
          onChange={ ({ target }) => handleStoreFilter(target) }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ addFilterToStore }
      >
        Filtrar
      </button>
      {storeAppliedFilters && storeAppliedFilters.map((myFilters) => (
        <section
          data-testid="filter"
          key={ myFilters.parameters }
        >
          <button
            key={ myFilters.parameters }
            type="button"
            onClick={ () => removeAFilter(myFilters) }
          >
            {myFilters.parameters}
          </button>
        </section>
      ))}
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ removeAll }
      >
        Remove All Filters
      </button>
    </section>
  );
}
