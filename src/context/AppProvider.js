import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getAPI from '../services/api_request';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [api, setApi] = useState([]);

  const fetchApi = async () => {
    const newPlanets = await getAPI();
    setApi(newPlanets);
  };
  useEffect(() => { fetchApi(); }, []);
  console.log(api);
  return (
    <AppContext.Provider
      value={ { api } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
