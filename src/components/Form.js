import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Form() {
  const { namePlanet, setNamePlanet } = useContext(AppContext);
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
    </form>
  );
}
