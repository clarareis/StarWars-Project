/* eslint-disable camelcase */
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { api, apiFilter, namePlanet } = useContext(AppContext);
  const getFilterPlanet = api.filter((element) => element.name.toLowerCase()
    .includes(namePlanet.toLowerCase()));
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {apiFilter.length ? (
          <>
            {apiFilter.map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
          </>
        ) : (
          <>
            {getFilterPlanet.map((currentPlanet, index) => (
              <tr key={ index }>
                <td>{currentPlanet.name}</td>
                <td>{currentPlanet.rotation_period}</td>
                <td>{currentPlanet.orbital_period}</td>
                <td>{currentPlanet.diameter}</td>
                <td>{currentPlanet.climate}</td>
                <td>{currentPlanet.gravity}</td>
                <td>{currentPlanet.terrain}</td>
                <td>{currentPlanet.surface_water}</td>
                <td>{currentPlanet.population}</td>
                <td>{currentPlanet.films}</td>
                <td>{currentPlanet.created}</td>
                <td>{currentPlanet.edited}</td>
                <td>{currentPlanet.url}</td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}
