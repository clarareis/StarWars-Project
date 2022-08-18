import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getAPI from '../services/api_request';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [api, setApi] = useState([]);
  const [namePlanet, setNamePlanet] = useState('');

  const fetchApi = async () => {
    const newPlanets = await getAPI();
    setApi(newPlanets);
  };
  useEffect(() => { fetchApi(); }, []);
  return (
    <AppContext.Provider
      value={ { api, namePlanet, setNamePlanet } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
